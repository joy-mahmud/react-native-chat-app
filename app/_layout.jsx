import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { View } from "react-native";
import { useAuth } from '../context/authContext'
import { useEffect } from "react";
import { AuthContextProvider } from '../context/authContext'
import { MenuProvider } from 'react-native-popup-menu';
const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return;
    const inApp = segments[0] == '(app)'
    if (isAuthenticated && !inApp) {
      router.replace('/home')
    } else if (isAuthenticated == false) {
      router.replace('/signIn')
    }
  }, [isAuthenticated])
  return <Slot />
}
export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout></MainLayout>
      </AuthContextProvider>
    </MenuProvider>

  );
}
