
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from "@/components/ui/map";
import { Card } from '../ui/card';
import { Icons } from '../brand';
export default function FooterMap() {
    return (
        <div className="mb-8 w-full h-[280px] sm:h-[320px] md:h-[420px] lg:h-[520px] ">
            <Card className="w-full h-full p-2">
                <Map center={[85.324, 27.7172]} zoom={11}>
                    <MapMarker longitude={85.324} latitude={27.7172}>
                        <MarkerContent>
                            <img
                                src="/brand-assets/brand-logo-icon.png"
                                alt="AceTheHimalaya logo"
                                className="h-10 w-10 rounded-lg border-2 border-muted object-cover shadow-lg"
                            />
                        </MarkerContent>
                        <MarkerPopup offset={20} anchor="top" className="max-w-[360px] flex flex-col justify-center items-center">
                            <div className="">
                                <Icons.navlogo className="h-8 w-auto" />
                                <span className="sr-only">AceTheHimalaya</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Experience the difference
                            </p>
                        </MarkerPopup>
                    </MapMarker>
                    <MapControls position="bottom-right" showCompass showZoom showLocate showFullscreen />
                </Map>
            </Card>
        </div>

    )
}
