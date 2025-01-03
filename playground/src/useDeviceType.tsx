import { useEffect, useState } from "react";

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      setIsMobile(true); // 모바일
    } else {
      setIsMobile(false); // 데스크톱
    }
  }, []);

  return isMobile;
};

export default useDeviceType;
