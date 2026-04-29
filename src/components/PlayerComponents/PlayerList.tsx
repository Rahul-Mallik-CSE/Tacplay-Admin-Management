/** @format */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import CommonPageSkeleton from "@/components/CommonComponents/CommonPageSkeleton";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPlayerListLimit,
  setPlayerListPage,
  setPlayerListSearch,
} from "@/redux/features/player/playerSlice";
import { useGetPlayersQuery } from "@/redux/features/player/playerAPI";
import type { PlayerListItem } from "@/types/PlayerTypes";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Player Lists",
    search: "Search...",
    failed: "Failed to load players.",
    refreshing: "Refreshing data...",
    userId: "User ID",
    fullName: "Full Name",
    email: "Email",
    country: "Country",
    sessionPlayed: "Session Played",
    matchesPlayed: "Matches Played",
    totalSpent: "Total Spent",
    status: "Status",
  },
  de: {
    title: "Spielerliste",
    search: "Suchen...",
    failed: "Spieler konnten nicht geladen werden.",
    refreshing: "Daten werden aktualisiert...",
    userId: "Benutzer-ID",
    fullName: "Vollständiger Name",
    email: "E-Mail",
    country: "Land",
    sessionPlayed: "Gespielte Sessions",
    matchesPlayed: "Gespielte Matches",
    totalSpent: "Gesamtausgaben",
    status: "Status",
  },
  fr: {
    title: "Liste des joueurs",
    search: "Rechercher...",
    failed: "Impossible de charger les joueurs.",
    refreshing: "Actualisation des données...",
    userId: "ID utilisateur",
    fullName: "Nom complet",
    email: "E-mail",
    country: "Pays",
    sessionPlayed: "Sessions jouées",
    matchesPlayed: "Matchs joués",
    totalSpent: "Total dépensé",
    status: "Statut",
  },
  es: {
    title: "Lista de jugadores",
    search: "Buscar...",
    failed: "No se pudieron cargar los jugadores.",
    refreshing: "Actualizando datos...",
    userId: "ID de usuario",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    country: "País",
    sessionPlayed: "Sesiones jugadas",
    matchesPlayed: "Partidas jugadas",
    totalSpent: "Total gastado",
    status: "Estado",
  },
} as const;

const PlayerList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { search, page, limit } = useAppSelector((state) => state.player.list);
  const [searchInput, setSearchInput] = useState(search);
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setPlayerListSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetPlayersQuery({
    search,
    page,
    limit,
  });

  const meta = data?.meta;

  const tableData = useMemo(
    () =>
      (data?.data ?? []).map((item: PlayerListItem) => ({
        userId: item.user_id,
        displayId: item.display_id,
        fullName: item.full_name,
        email: item.email,
        country: item.country,
        sessionPlayed: item.session_played,
        matchesPlayed: item.matches_played,
        totalSpent: item.total_spent,
        status: item.status,
        canView: item.can_view,
        subscriptionPlan: item.subscription_plan,
      })),
    [data?.data],
  );

  const columns = [
    {
      header: text.userId,
      accessor: (row: (typeof tableData)[number]) => (
        <span className="text-primary/80">{row.displayId}</span>
      ),
    },
    { header: text.fullName, accessor: "fullName" as const },
    { header: text.email, accessor: "email" as const },
    { header: text.country, accessor: "country" as const },
    { header: text.sessionPlayed, accessor: "sessionPlayed" as const },
    { header: text.matchesPlayed, accessor: "matchesPlayed" as const },
    { header: text.totalSpent, accessor: "totalSpent" as const },
    { header: text.status, accessor: "status" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-36" columns={6} rows={12} />;
  }

  return (
    <div className="space-y-4">
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

      <CustomTable
        data={tableData}
        columns={columns}
        itemsPerPage={meta?.limit ?? limit}
        currentPage={meta?.page ?? page}
        totalPages={meta?.totalPage ?? 1}
        totalItems={meta?.total ?? tableData.length}
        onPageChange={(nextPage) => dispatch(setPlayerListPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setPlayerListLimit(nextLimit))
        }
        onAction={(row) => {
          if (row.canView) {
            router.push(`/player/${row.userId}`);
          }
        }}
      />
    </div>
  );
};

export default PlayerList;
