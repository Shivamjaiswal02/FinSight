import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams }) {
  const params = searchParams || {};
  const editId = params?.edit || null;

  let accounts = [];
  let initialData = null;

  try {
    accounts = (await getUserAccounts()) || [];
  } catch (e) {
    console.error("accounts load error", e);
  }

  if (editId) {
    try {
      initialData = await getTransaction(editId);
    } catch (e) {
      console.error("tx load error", e);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">Add Transaction</h1>
      </div>

      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}