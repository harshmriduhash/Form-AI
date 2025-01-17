import { fetchAllFormsByUserId, fetchFormStats } from '@/actions/form-action';
import { Separator } from '@/components/ui/separator';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import CreateForm from './_components/CreateForm';
import StatsCard from './_components/StatsCard';
import DashboardHeader from './_components/_common/DashboardHeader';
import FormItem from './_components/_common/FormItem';

const DashBoardPage = () => {



    return (
        <div className='w-full pt-8'>
            <div className="w-full max-w-6xl mx-auto px-5 md:px-0 pt-1">
                {/* Forms stats  */}
                <section className='stats-section w-full'>
                    <div className="w-full flex flex-col md:flex-row gap-5 items-center justify-between py-5">
                        <DashboardHeader />
                        <CreateForm />
                    </div>
                    <StatsListWrapper />
                </section>

                <Separator className="my-10" />

                {/* All Your forms  */}
                <section className='w-full pb-10'>
                    <div className="w-full flex items-center mb-4">
                        <h2 className='text-2xl font-semibold tracking-tight'>Your Form&apos;s</h2>
                    </div>

                    <div className='grid gap-4 grid-cols-2 md:grid-cols-4'>
                        <Suspense fallback={[1, 2, 3, 4].map(() => (
                            // eslint-disable-next-line react/jsx-key
                            <Loader size={30} className='animate-spin' />
                        ))}>
                            <FormList />
                        </Suspense>
                    </div>
                </section>
            </div>
        </div>
    )
};


const StatsListWrapper = async () => {
    // const fetchStats = async () => {
    //     try {
    //         const response = await axios.get('/api/forms/fetchStats');
    //         console.log(response);
    //         return response.data;
    //     } catch (error: any) {
    //         console.error("Error fetching form stats:", error.response?.data || error.message);
    //         return { success: false, message: error.response?.data?.error || "Failed to fetch form stats" };
    //     }
    // };

    // const stats = await fetchStats();

    const stats = await fetchFormStats();
    return (
        <StatsCard loading={false} data={stats} />
    )
};

const FormList = async () => {
    const { allForms } = await fetchAllFormsByUserId();
    return (
        <>
            {
                allForms && allForms.length > 0 ? (
                    <>
                        {
                            allForms.map((form) => (
                                <FormItem
                                    key={form.id}
                                    id={form.id}
                                    formId={form.formId}
                                    name={form.name}
                                    published={form.published}
                                    createdAt={form.createdAt}
                                    responses={form.responses}
                                    views={form.views}
                                    backgroundColor={form.settings.backgroundColor}
                                />

                            ))
                        }
                    </>
                ) : (
                    <div className="flex items-center justify-center mt-5 text-primary font-semibold text-lg">No Form Created Yet😞</div>
                )
            }
        </>
    )
}

export default DashBoardPage