'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: `You do not have permission to ${error.context.operation} at ${error.context.path}.`,
      });
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9tGHZmQxr3P2GOlRuMyBrlHWVZzOrUXg",
  authDomain:  "studio-4700160227-9da4f.firebaseapp.com",
  projectId: "studio-4700160227-9da4",
  storageBucket: "studio-4700160227-9da4f.firebasestorage.app",
  messagingSenderId: "990370658455",
  appId: "1:990370658455:web:041f8e0d2ae9d1de3c11d2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log("✅ Firebase initialized successfully");