import { fetchProfileAction } from "@/actions";
import Header from "../header";
import { currentUser } from "@clerk/nextjs/server";
    


async function CommonLayout({ children }) {
    const user = await currentUser();

    const profileInfo = await fetchProfileAction(user?.id);

    return <div className="mx-auto max-w-7xl lg:px-8">
        {/* Header Component */}

        <Header 
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
         />
        {/* Header Component */}


        {/* Main content */}
        <main>{children}</main>

        {/* Main content */}

    </div>
}

export default CommonLayout;