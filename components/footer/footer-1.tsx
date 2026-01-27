
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map";
import { Card } from '../ui/card';
import { Icons } from '../brand';
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
export default function FooterMap() {
    return (
        <div className="mb-8 w-full h-[280px] sm:h-[320px] md:h-[420px] lg:h-[520px] ">
            <Card className="w-full h-full p-2">
                <Map center={[85.324, 27.7172]} zoom={11}>
                    <MapMarker longitude={85.324} latitude={27.7172}>
                        <MarkerContent>
                            <Icons.iconlogo className="h-16 w-auto" />
                        </MarkerContent>
                        <MarkerPopup offset={20} anchor="top" className="max-w-[360px] font-semibold text-base text-center flex flex-col gap-2 justify-center items-center">
                            <p className="text-2xl font-extrabold">HEAD OFFICE</p>
                            <Separator />
                            <p className="cursor-pointer select-all">A- One Business Complex, Thamel, Kathmandu, Nepal</p>
                            <Separator />
                            <p>Time: 10:00 AM to 6:00 PM</p>
                            <Separator />
                            <p className="flex gap-2">

                                <span className="cursor-pointer select-all">+97714523719</span>
                                <span className="cursor-pointer select-all">+97714523720</span>
                            </p>
                        </MarkerPopup>
                    </MapMarker>
                    <MapControls position="bottom-right" showCompass showZoom showLocate showFullscreen />
                </Map>
            </Card>
        </div>

    )
}
