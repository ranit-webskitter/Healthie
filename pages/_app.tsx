import MuiThemeProvider from "@/mui-theme/MuiThemeProvider";
import type { AppProps } from "next/app";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "@/rdux-toolkit/store/store";
// Create a client
const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
   {/* <MuiThemeProvider> */}
  
   <ToastContainer/>
    <Component {...pageProps} />
   {/* </MuiThemeProvider> */}
   </QueryClientProvider>
   </Provider>
   </>
  
 
}
