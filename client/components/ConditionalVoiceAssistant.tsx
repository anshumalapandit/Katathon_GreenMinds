import { useLocation } from "react-router-dom";
import VoiceAssistant from "./VoiceAssistant";

export default function ConditionalVoiceAssistant() {
  const location = useLocation();
  
  // Hide VoiceAssistant on impact-route page (has its own weather chatbot)
  const hideOnRoutes = ["/impact-route", "/route-impact-map"];
  const shouldHide = hideOnRoutes.some(route => location.pathname.startsWith(route));
  
  if (shouldHide) {
    return null;
  }
  
  return <VoiceAssistant />;
}
