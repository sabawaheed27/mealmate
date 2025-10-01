
// import { fireEvent, render, screen,  } from "@testing-library/react";
// import Navbar from "@/components/Navbar";
// import { UserContext } from "@/context/UserContext";
// import { useRouter } from "next/navigation";

// jest.mock("next/navigation",() =>({
//     useRouter: jest.fn(),
// }))//router.replace Next.js useRouter hook Mock useRouter and return fake replace

// describe("Navbar", () =>{
//     let mockReplace: jest.Mock;
//     let mockLogout: jest.Mock;

//     beforeEach(()=>{
//         mockReplace = jest.fn();
//         mockLogout = jest.fn();
//         (useRouter as jest.Mock).mockReturnValue({replace: mockReplace})
//         //You don’t need mockLogout in beforeEach like mockReplace because it’s not part of a hook inside the component — you control it directly by passing it into UserContext.Provider.
//         //logout our context (UserContext)Create mockLogout and pass it as context value
//  })
//  it("renders logo text 'FlavorQuest'", () =>{
//     render(
//         <UserContext.Provider value={{user:{name: "Misty"}, logout: mockLogout}}>
//             <Navbar/>
//         </UserContext.Provider>
//     );
//     expect(screen.getByText("FlavorQuest")).toBeInTheDocument();

//  })
//  it("render user name and navigation links when logged in ", () =>{
//     render(
//         <UserContext.Provider value={{user: {name: "Ash"}, logout: mockLogout}}>
//             <Navbar/>
//         </UserContext.Provider>
//     )
//     expect(screen.getByText("Hi, Ash")).toBeInTheDocument();
//     expect(screen.getByText("Home")).toBeInTheDocument();
//     expect(screen.getByText("Profile")).toBeInTheDocument();
//     expect(screen.getByText("Categories")).toBeInTheDocument();
//     expect(screen.getByText("Logout")).toBeInTheDocument();
 
//  })
//  it("calls logout when logout button is clicked", ()=>{
//     render(
//         <UserContext.Provider value={{user: {name: "Misty"}, logout: mockLogout}}>
//             <Navbar/>
//         </UserContext.Provider>
//     )
//     const logoutButton = screen.getByText("Logout");
//     fireEvent.click(logoutButton);
//     expect(mockLogout).toHaveBeenCalled();
//     expect(mockReplace).toHaveBeenCalledWith("/")
//  })

// })







// // render: renders a React component inside a fake DOM (for testing).
// // screen: gives you helpers (getByText, getByRole, etc.) to find things on the screen.
// // fireEvent.click as a fallback if you just want something quick.
// // userEvent.click in await since modern versions are async.
// // UserContext: provides fake user/login/logout data.
// // useRouter: Next.js hook for navigation (we’ll mock it).