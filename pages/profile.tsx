import { useWallet } from '@meshsdk/react';
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "components/layout";
import { Auth } from "components/common";



const Profile: NextPageWithLayout = () => {
    const { wallet } = useWallet()

    console.log(wallet)

    return (
        <Auth>
            <div className="container">
                Pofile
            </div>
        </Auth>

    );
}
Profile.Layout = MainLayout
export default Profile