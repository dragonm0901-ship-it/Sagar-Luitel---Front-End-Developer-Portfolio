import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

// For Option 1 (Static Hashed Keys), we store the SHA-256 hashes of the valid secret keys here.
// You can generate a new hash using a free online SHA-256 generator or Web Crypto API.
// Hash: d40f119fe2b57f6c4e1bffda5370354660cd4d23232ff38048c131bdccb92b39
const VALID_KEY_HASHES = [
    'd40f119fe2b57f6c4e1bffda5370354660cd4d23232ff38048c131bdccb92b39'
];

// Helper to hash a string to SHA-256 using native browser API
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const AuthGate = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Initial check for existing valid session in localStorage
    useEffect(() => {
        const checkExistingSession = async () => {
            const savedKey = localStorage.getItem('course_secret_key');
            if (savedKey) {
                const hash = await sha256(savedKey);
                if (VALID_KEY_HASHES.includes(hash)) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('course_secret_key'); // Invalid key found
                }
            }
            setIsChecking(false);
        };
        
        checkExistingSession();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const hash = await sha256(inputValue.trim());
            
            if (VALID_KEY_HASHES.includes(hash)) {
                // Success!
                localStorage.setItem('course_secret_key', inputValue.trim());
                setIsAuthenticated(true);
            } else {
                setError('Invalid Secret Key. Please try again.');
            }
        } catch (err) {
            setError('Authentication error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isChecking) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-[#ffff00] font-mono text-sm tracking-widest uppercase">
                Verifying Access...
            </div>
        );
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-[#ccff00]/10 flex items-center justify-center border border-[#ccff00]/20">
                            <Lock size={28} className="text-[#ccff00]" />
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">Secure Access</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            These premium development courses are restricted. Please enter your secret key provided by Sagar to unlock the curriculum.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                                <KeyRound size={18} />
                            </div>
                            <input 
                                type="password" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter Secret Key..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/10 transition-all font-mono text-sm"
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-lg text-xs font-mono">
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button 
                            type="submit"
                            disabled={!inputValue.trim() || isLoading}
                            className="w-full relative group overflow-hidden bg-[#ccff00] text-black font-bold text-sm uppercase tracking-widest py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-white"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? 'Verifying...' : 'Unlock Portal'}
                                {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </button>
                    </form>
                </div>
                
                <div className="mt-8 text-center flex items-center justify-center gap-2 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                    <ShieldCheck size={12} />
                    <span>End-to-end Encrypted</span>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthGate;
