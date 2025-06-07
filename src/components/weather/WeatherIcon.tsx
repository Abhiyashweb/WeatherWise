import type { WeatherConditionCode } from '@/types/weather';
import { 
  SunMedium, Cloud, CloudSun, CloudRain, CloudSnow, CloudLightning, Wind, CloudFog, HelpCircle, ThermometerSnowflake, ThermometerSun
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  conditionCode: WeatherConditionCode;
  size?: number;
}

export default function WeatherIcon({ conditionCode, size = 48, className, ...props }: WeatherIconProps) {
  const iconProps = { size, className, ...props };

  switch (conditionCode) {
    case 'sunny':
      return <ThermometerSun {...iconProps} />;
    case 'cloudy':
      return <Cloud {...iconProps} />;
    case 'partly-cloudy':
      return <CloudSun {...iconProps} />;
    case 'rainy':
      return <CloudRain {...iconProps} />;
    case 'snowy':
      return <ThermometerSnowflake {...iconProps} />;
    case 'thunderstorm':
      return <CloudLightning {...iconProps} />;
    case 'windy':
      return <Wind {...iconProps} />;
    case 'foggy':
      return <CloudFog {...iconProps} />;
    default:
      return <HelpCircle {...iconProps} />;
  }
}
