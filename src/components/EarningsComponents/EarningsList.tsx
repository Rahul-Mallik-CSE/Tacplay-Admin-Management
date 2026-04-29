/** @format */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setEarningsLimit,
  setEarningsPage,
  setEarningsSearch,
} from "@/redux/features/earnings/earningsSlice";
import { useGetAdminEarningsQuery } from "@/redux/features/earnings/earningsAPI";
import CommonPageSkeleton from "@/components/CommonComponents/CommonPageSkeleton";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Earning Lists",
    search: "Search...",
    failed: "Failed to load earnings list.",
    refreshing: "Refreshing data...",
    transactionId: "Transaction ID",
    userName: "User Name",
    userId: "User ID",
    plan: "Plan",
    amount: "Amount",
    date: "Date",
  },
  de: {
    title: "Einnahmenliste",
    search: "Suchen...",
    failed: "Einnahmen konnten nicht geladen werden.",
    refreshing: "Daten werden aktualisiert...",
    transactionId: "Transaktions-ID",
    userName: "Benutzername",
    userId: "Benutzer-ID",
    plan: "Tarif",
    amount: "Betrag",
    date: "Datum",
  },
  fr: {
    title: "Liste des revenus",
    search: "Rechercher...",
    failed: "Impossible de charger la liste des revenus.",
    refreshing: "Actualisation des données...",
    transactionId: "ID de transaction",
    userName: "Nom d'utilisateur",
    userId: "ID utilisateur",
    plan: "Forfait",
    amount: "Montant",
    date: "Date",
  },
  es: {
    title: "Lista de ingresos",
    search: "Buscar...",
    failed: "No se pudo cargar la lista de ingresos.",
    refreshing: "Actualizando datos...",
    transactionId: "ID de transacción",
    userName: "Nombre de usuario",
    userId: "ID de usuario",
    plan: "Plan",
    amount: "Importe",
    date: "Fecha",
  },
} as const;

const EarningsList = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { search, page, limit } = useAppSelector((state) => state.earnings);
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setEarningsSearch(trimmed));
      }
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetAdminEarningsQuery({
    search,
    page,
    limit,
  });

  const meta = data?.meta;

  const tableData = useMemo(() => {
    const earnings = data?.data ?? [];

    return earnings.map((item) => ({
      id: item.display_transaction_id,
      userName: item.user_name,
      userId: item.display_user_id,
      plan: item.plan,
      amount: item.amount_display,
      date: item.date_display,
    }));
  }, [data?.data]);

  const columns = [
    {
      header: text.transactionId,
      accessor: (row: (typeof tableData)[number]) => (
        <div className="flex items-center gap-2">
          <span className="text-primary/80">{row.id}</span>
        </div>
      ),
    },
    { header: text.userName, accessor: "userName" as const },
    { header: text.userId, accessor: "userId" as const },
    { header: text.plan, accessor: "plan" as const },
    { header: text.amount, accessor: "amount" as const },
    { header: text.date, accessor: "date" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-40" columns={6} rows={12} />;
  }

  return (
    <div className=" space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          {text.title}
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={text.search}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 bg-muted border-white/10 text-primary text-sm h-9 w-full sm:w-60"
            />
          </div>
        </div>
      </div>

      {isError ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {text.failed}
        </div>
      ) : null}

      {isFetching && !isLoading ? (
        <p className="text-xs text-muted-foreground">{text.refreshing}</p>
      ) : null}

      {/* Table */}
      <CustomTable
        data={tableData}
        columns={columns}
        itemsPerPage={meta?.limit ?? limit}
        currentPage={meta?.page ?? page}
        totalPages={meta?.totalPage ?? 1}
        totalItems={meta?.total ?? tableData.length}
        onPageChange={(nextPage) => dispatch(setEarningsPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setEarningsLimit(nextLimit))
        }
      />
    </div>
  );
};

export default EarningsList;
