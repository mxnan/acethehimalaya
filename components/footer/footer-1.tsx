
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map";
import { Card } from '../ui/card';
import { Icons } from '../brand';
import { Badge } from "../ui/badge";
import { Clock, Info, PhoneCall } from "lucide-react";

export default function FooterOne() {
    return (
        <div className="mb-8 w-full h-[280px] sm:h-[320px] md:h-[420px] lg:h-[520px] px-4 lg:px-6">
            <Card className="w-full h-full p-2 rounded-lg overflow-hidden">
                <Map center={[85.324, 27.7172]} zoom={11}>
                    <MapMarker longitude={85.324} latitude={27.7172}>
                        <MarkerContent>
                            <div className="bg-primary-foreground rounded-lg border-2 border-primary ">
                                <Icons.brandlogo className="w-16 h-16" />
                            </div>

                        </MarkerContent>
                        <MarkerPopup offset={20} anchor="top" className="max-w-[360px] py-4 font-semibold text-base text-center flex flex-col justify-center items-center">
                            <Badge className="text-lg font-bold"><Info />Head Office</Badge>

                            <Card className="bg-muted border-2 shadow-lg cursor-pointer p-4 my-3 select-all">A- One Business Complex, Thamel, Kathmandu, Nepal</Card>

                            <Badge className="font-semibold"><Clock />Time: 10:00 AM to 6:00 PM</Badge>

                            <p className="mt-2 flex gap-2">

                                <Badge className="cursor-pointer select-all"><PhoneCall />+97714523719</Badge>
                                <Badge className="cursor-pointer select-all"><PhoneCall />+97714523720</Badge>
                            </p>
                        </MarkerPopup>
                    </MapMarker>
                    <MapControls position="bottom-right" showCompass showZoom showLocate showFullscreen />
                </Map>
            </Card>
        </div>

    )
}
