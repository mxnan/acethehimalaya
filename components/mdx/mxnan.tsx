import React from 'react'
import { Icons } from '../brand'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { LaptopMinimalCheckIcon } from 'lucide-react'

const Mxnan = () => {
    return (
        <div className='relative w-full'>
            <div className='text-center'>
                <Separator className='my-8' />
                <Card className="my-16 p-6 mx-auto grow overflow-hidden">
                    <CardHeader>
                        <CardTitle className='text-2xl'>
                            This Page is not yet completed.
                        </CardTitle>
                        <CardDescription>
                            This message has been left here to remind DEV that this page is not yet completed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='h-full flex flex-col justify-center items-center'>
                        <div className='grid grid-cols-2 gap-2'>
                            <Button asChild variant={"default"} className='cursor-pointer'>
                                <Link href={"/"}>
                                    Home
                                </Link>
                            </Button>
                            <Button asChild variant={"default"} className='cursor-pointer'>
                                <Link href={"/trips"}>
                                    Trips
                                </Link>
                            </Button>
                            <Button asChild variant={"default"} className='cursor-pointer'>
                                <Link href={"/blogs"}>
                                    Blogs
                                </Link>
                            </Button>
                            <Button asChild variant={"default"} className='cursor-pointer'>
                                <Link href={"/company"}>
                                    Company
                                </Link>
                            </Button>
                        </div>


                        <div className="mt-8 text-sm text-muted-foreground">
                            <p className=''>
                                Connect/Inform of any Bugs
                            </p>
                            <div className='flex justify-center items-center gap-2 '>
                                <LaptopMinimalCheckIcon className="inline-block ml-1 size-10 stroke-1" />{" "}
                                by
                                <Link
                                    href="https://x.com/mxn8n"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-1 pt-2 pb-2 font-bold custom-underline transition-colors hover:text-foreground"
                                >
                                    @mxnan
                                </Link>
                            </div>

                        </div>

                    </CardContent>
                </Card>
                <Card className="my-16 lg:max-h-[300px] aspect-video w-full grow overflow-hidden shadow-none border-none bg-primary-background" >
                    <Icons.iconlogo className="w-full h-full" />
                </Card>






            </div >
        </div >
    )
}

export default Mxnan