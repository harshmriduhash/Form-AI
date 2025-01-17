import { fetchFormStats } from '@/actions/form-action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from 'lucide-react';
import React from 'react';

type Props = {
    loading: boolean;
    data: Awaited<ReturnType<typeof fetchFormStats>>;
};

function StatsCard({ loading, data }: Props) {
    const cards = [
        {
            title: 'Total Forms',
            value: data.totalForms || 0,
            description: 'All forms created by you',
        },
        {
            title: 'Total Responds',
            value: data.totalResponses || 0,
            description: 'Responses got submitted in your forms',
        },
        {
            title: 'Conversion Rate',
            value: `${data.conversionRate || 0}%`,
            description: '% of views that responded to your forms',
        },
        {
            title: 'Engagement Rate',
            value: `${data.engagementRate || 0}%`,
            description: '% of your forms got responses',
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {cards.map((card, index) => (
                <Card key={index} className="bg-slate-50">
                    <CardHeader className="pb-2">
                        <CardDescription>{card.title}</CardDescription>
                        <CardTitle className="text-4xl text-primary">
                            {loading ? (
                                <Loader className="h-9 animate-spin" />
                            ) : (
                                card.value
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs opacity-50">{card.description}</CardContent>
                </Card>
            ))}
        </div>
    );
}

export default StatsCard;
