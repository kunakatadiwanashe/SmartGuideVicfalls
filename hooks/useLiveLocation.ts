import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export const useLiveLocation = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    let subscriber: any;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 2,
        },
        (loc) => {
          setLocation(loc.coords);
        }
      );
    })();

    return () => {
      subscriber?.remove();
    };
  }, []);

  return location;
};