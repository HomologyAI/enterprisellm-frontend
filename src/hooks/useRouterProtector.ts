import {useAppsStore} from "@/store/apps";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const useRouterProtector = () => {
  const apps = useAppsStore(s => s.apps);
  const router = useRouter();

  useEffect(() => {
    if (!apps.length) {
      router.replace('/');
    }
  }, [apps]);
};

export default useRouterProtector;