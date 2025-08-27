import KnowledgeBase from "@/features/knowledge-base/components/KnowledgeBase";
import { Suspense } from "react";

export default function KnowledgePage() {
    return (
        <Suspense fallback={<div>Carregando base de conhecimento...</div>}>
            <KnowledgeBase />
        </Suspense>
    )
}