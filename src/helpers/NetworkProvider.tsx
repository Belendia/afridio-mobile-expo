import React, { useEffect, useState, ReactNode } from "react";
import NetInfo from "@react-native-community/netinfo";

export const NetworkContext = React.createContext({ isOffline: false });

type NetworkProviderProps = {
  children: ReactNode;
};

type ConnectionType = {
  isOffline: boolean;
};

const NetworkProvider = ({ children }: NetworkProviderProps) => {
  const [isOffline, setIsOffline] = useState<ConnectionType>({
    isOffline: false,
  });

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !state.isConnected;

      setIsOffline({ isOffline: offline });
    });

    return () => removeNetInfoSubscription();
  }, []);
  return (
    <NetworkContext.Provider value={isOffline}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
