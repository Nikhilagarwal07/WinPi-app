// File: frontend/src/components/Layout.jsx

import React from "react";

const AnimatedShapes = () => (
    <div className="shapes-background">
        <div className="shape square s1" style={{width: 80, height: 80}}></div>
        <div className="shape circle s2" style={{width: 20, height: 20}}></div>
        <div className="shape triangle s3" style={{width: 0, height: 0}}></div>
        <div className="shape cross s4" style={{width: 60, height: 60}}></div>
        <div className="shape circle s5" style={{width: 20, height: 20}}></div>
        <div className="shape square s6" style={{width: 110, height: 110}}></div>
        <div className="shape triangle s7" style={{width: 0, height: 0, borderLeftWidth: 75, borderRightWidth: 75, borderBottomWidth: 150}}></div>
        <div className="shape cross s8" style={{width: 25, height: 25}}></div>
    </div>
);

const BottomNav = () => {
    const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    const GamesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.25 2.75 4.75 6.25v7.5L10.25 17.25"/><path d="m13.75 2.75 5.5 3.5v7.5l-5.5 3.5"/><path d="M12 22.25v-5l-5.5-3.5-5.5 3.5v-7.5l5.5-3.5 5.5 3.5 5.5-3.5v7.5l-5.5 3.5Z"/></svg>;
    const LeaderboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1"/></svg>;
    const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>;
  
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-brand-card/80 backdrop-blur-sm border-t border-white/10 px-6 py-3 z-50">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center space-y-1 text-brand-primary"><HomeIcon /><span className="text-xs">Home</span></button>
          <button className="flex flex-col items-center space-y-1 text-brand-subtext"><GamesIcon /><span className="text-xs">Games</span></button>
          <button className="flex flex-col items-center space-y-1 text-brand-subtext"><LeaderboardIcon /><span className="text-xs">Leaderboard</span></button>
          <button className="flex flex-col items-center space-y-1 text-brand-subtext"><ProfileIcon /><span className="text-xs">Profile</span></button>
        </div>
      </nav>
    );
};

// --- The Updated Layout Component ---
export default function Layout({ children }) {
    return (
        <div className="relative h-screen w-full overflow-hidden"> {/* Outer container that doesn't scroll */}
            <AnimatedShapes />
            
            {/* THIS IS THE NEW SCROLLING CONTAINER */}
            <div className="absolute top-0 left-0 h-full w-full overflow-y-auto pr-[17px] box-content">
                <div className="min-h-full">
                    <main className="relative z-10">
                        {children}
                    </main>
                </div>
            </div>
            
            <BottomNav />
        </div>
    );
}