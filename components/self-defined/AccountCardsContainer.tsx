import AccountCard from "./AccountCard";
import { DetailedAccountRecord } from "./types";

interface AccountCardsContainerProp {
    records: DetailedAccountRecord[]
}

const AccountCardsContainer = (
    {
        records
    }: AccountCardsContainerProp
) => {
    return (
        <>
            {
                records.map(record => (
                    <AccountCard key={record.id} record={record} />
                ))
            }
        </>
    )   
}

export default AccountCardsContainer;