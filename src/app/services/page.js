"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/home/ServicesSection";
import LetsTalkFloating from "@/components/home/LetsTalkFloating";
import { motion } from "framer-motion";

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow pt-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <ServicesSection />
                </motion.div>
            </main>
            <Footer />
            <LetsTalkFloating />
        </div>
    );
}
