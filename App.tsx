import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { I18nextProvider } from "react-i18next";

import { RootNavigator } from "~/navigators";
import { i18n } from "~/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { cacheTime: 1000 * 60 * 60 * 24 }, // 24 hrs
  },
});

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <I18nextProvider i18n={i18n}>
        <RootNavigator />
      </I18nextProvider>
    </PersistQueryClientProvider>
  );
}
