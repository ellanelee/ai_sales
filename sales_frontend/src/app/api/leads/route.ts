import { NextResponse } from "next/server";
import { MOCK_LEADS } from "@/mock/lead";

export async function GET(req:Request){
    const { searchParams } = new URL(req.url)
    const industry = searchParams.get("industry")
    const minScoreParam = searchParams.get("minScore")

    let data = [ ...MOCK_LEADS]
    
    if(industry && industry != "all"){
        data = data.filter((lead) => lead.industry === industry)
    }

    if (minScoreParam){
        const minScore = Number(minScoreParam)
        if(!Number.isNaN(minScore)){
            data= data.filter((lead)=> lead.score >= minScore)
        }
    }

    return NextResponse.json(data)
}