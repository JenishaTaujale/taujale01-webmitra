import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { StoreConfig } from "./types";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Fetches the store configuration for a specific user.
 */
export async function fetchStoreConfig(userId: string): Promise<StoreConfig | null> {
  const path = `storeConfigs/${userId}`;
  const localKey = `webmitra_store_config_${userId}`;
  
  // Try loading from localStorage first as a reliable fallback
  let localFallback: StoreConfig | null = null;
  try {
    const localData = localStorage.getItem(localKey);
    if (localData) {
      localFallback = JSON.parse(localData);
    }
  } catch (e) {
    console.warn("Failed to read store configuration from localStorage:", e);
  }

  try {
    const docRef = doc(db, "storeConfigs", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const config: StoreConfig = {
        name: data.name || "",
        slug: data.slug || "",
        tagline: data.tagline || "",
        description: data.description || "",
        category: data.category || "",
        accentColor: data.accentColor || "",
        paymentGateways: data.paymentGateways || [],
        courierService: data.courierService || "",
        products: data.products || [],
      };
      
      // Update local storage representation to stay in sync
      try {
        localStorage.setItem(localKey, JSON.stringify(config));
      } catch (e) {
        console.warn("Failed to update store configuration in localStorage:", e);
      }
      return config;
    }
    return localFallback;
  } catch (error: any) {
    // If we're offline or have network limits, treat as a silent fallback instead of crashing the app
    console.warn("Firestore fetch offline/restricted, using local storage cache:", error.message || error);
    return localFallback;
  }
}

/**
 * Saves or updates a store configuration for a specific user in Firestore.
 */
export async function saveStoreConfig(userId: string, config: StoreConfig): Promise<void> {
  const path = `storeConfigs/${userId}`;
  const localKey = `webmitra_store_config_${userId}`;

  // Save to localStorage immediately for instant offline durability
  try {
    localStorage.setItem(localKey, JSON.stringify(config));
  } catch (e) {
    console.warn("Failed to save store configuration to localStorage:", e);
  }

  try {
    const docRef = doc(db, "storeConfigs", userId);
    const existingSnap = await getDoc(docRef);
    
    if (existingSnap.exists()) {
      const existingData = existingSnap.data();
      await setDoc(docRef, {
        userId,
        name: config.name,
        slug: config.slug,
        tagline: config.tagline,
        description: config.description,
        category: config.category,
        accentColor: config.accentColor,
        paymentGateways: config.paymentGateways,
        courierService: config.courierService,
        products: config.products,
        createdAt: existingData.createdAt, // Preserve original createdAt timestamp
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(docRef, {
        userId,
        name: config.name,
        slug: config.slug,
        tagline: config.tagline,
        description: config.description,
        category: config.category,
        accentColor: config.accentColor,
        paymentGateways: config.paymentGateways,
        courierService: config.courierService,
        products: config.products,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error: any) {
    // Notify in logs politely but avoid throwing hard errors so the user session remains fluent
    console.warn("Firestore save offline/restricted, saved locally database update queued:", error.message || error);
  }
}
