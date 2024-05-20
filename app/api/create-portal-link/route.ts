import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { NextResponse } from "next/server";
import {stripe} from "@/libs/stripe";
import { getURL } from "@/libs/helper";
import { createOrRetrieveACustomer } from "@/libs/supabaseAdmin";

export const POST = async() => {
    try{
        const supabase = await createRouteHandlerClient({
            cookies
        })

        const {data: {user}} = await supabase.auth.getUser();

        if(!user) throw new Error("Could not get user");

        const customer = await createOrRetrieveACustomer({
            uuid: user.id || '',
            email: user.email || '',
        })

        if(!customer) throw new Error("Could not get customer");

        const {url} = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getURL()}/account`
        })

        return NextResponse.json(url, {status: 200})

    } catch(error: any) {
        console.log(error);
        return NextResponse.json("Internal error", {status: 500})
    }
}

