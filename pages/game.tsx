import { useWallet } from '@meshsdk/react';
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "components/layout";
import { Auth } from "components/common";



const Game: NextPageWithLayout = () => {

    return (
        <Auth>
            <div className="container">
                Game
            </div>
        </Auth>

    );
}
Game.Layout = MainLayout
export default Game