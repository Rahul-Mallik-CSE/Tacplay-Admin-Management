/** @format */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import CommonPageSkeleton from "@/components/CommonComponents/CommonPageSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSessionManagementLimit,
  setSessionManagementMatchType,
  setSessionManagementPage,
  setSessionManagementSearch,
  setSessionManagementStatus,
} from "@/redux/features/sessionManagement/sessionManagementSlice";
import { useGetSessionManagementListQuery } from "@/redux/features/sessionManagement/sessionManagementAPI";
import type { SessionManagementListItem } from "@/types/SessionManagementTypes";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Session Management List",
    search: "Search...",
    failed: "Failed to load sessions.",
    refreshing: "Refreshing data...",
    sessionId: "Session ID",
    sessionName: "Session Name",
    fieldId: "Field ID",
    player: "Player",
    amount: "Amount",
    status: "Status",
    allStatus: "All Status",
    allMatchTypes: "All Match Types",
    ranked: "Ranked",
    social: "Social",
  },
  de: {
    title: "Sitzungsverwaltung",
    search: "Suchen...",
    failed: "Sessions konnten nicht geladen werden.",
    refreshing: "Daten werden aktualisiert...",
    sessionId: "Session-ID",
    sessionName: "Sessionname",
    fieldId: "Feld-ID",
    player: "Spieler",
    amount: "Betrag",
    status: "Status",
    allStatus: "Alle Status",
    allMatchTypes: "Alle Spieltypen",
    ranked: "Rangliste",
    social: "Social",
  },
  fr: {
    title: "Gestion des sessions",
    search: "Rechercher...",
    failed: "Impossible de charger les sessions.",
    refreshing: "Actualisation des données...",
    sessionId: "ID de session",
    sessionName: "Nom de session",
    fieldId: "ID du terrain",
    player: "Joueur",
    amount: "Montant",
    status: "Statut",
    allStatus: "Tous les statuts",
    allMatchTypes: "Tous les types de match",
    ranked: "Classé",
    social: "Social",
  },
  es: {
    title: "Gestión de sesiones",
    search: "Buscar...",
    failed: "No se pudieron cargar las sesiones.",
    refreshing: "Actualizando datos...",
    sessionId: "ID de sesión",
    sessionName: "Nombre de sesión",
    fieldId: "ID del campo",
    player: "Jugador",
    amount: "Importe",
    status: "Estado",
    allStatus: "Todos los estados",
    allMatchTypes: "Todos los tipos de partida",
    ranked: "Clasificada",
    social: "Social",
  },
} as const;

const extractSessionNumericId = (sessionId: string) => {
  const matched = sessionId.match(/\d+/g);
  if (!matched?.length) {
    return null;
  }

  return Number(matched[matched.length - 1]);
};

const SessionList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { search, page, limit, status, matchType } = useAppSelector(
    (state) => state.sessionManagement.list,
  );
  const [searchInput, setSearchInput] = useState(search);
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setSessionManagementSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } =
    useGetSessionManagementListQuery({
      search,
      page,
      limit,
      status: status === "all" ? undefined : status,
      match_type: matchType === "all" ? undefined : matchType,
    });

  const meta = data?.meta;

  const tableData = useMemo(
    () =>
      (data?.data ?? []).map((item: SessionManagementListItem) => ({
        internalId: extractSessionNumericId(item.session_id),
        sessionId: item.session_id,
        sessionName: item.session_name,
        fieldId: item.field_id,
        player: item.player,
        amount: item.amount,
        status: item.status_display,
      })),
    [data?.data],
  );

  const columns = [
    {
      header: text.sessionId,
      accessor: (row: (typeof tableData)[number]) => (
        <div className="flex items-center gap-2">
          <span className="text-primary/80">{row.sessionId}</span>
        </div>
      ),
    },
    { header: text.sessionName, accessor: "sessionName" as const },
    { header: text.fieldId, accessor: "fieldId" as const },
    { header: text.player, accessor: "player" as const },
    { header: text.amount, accessor: "amount" as const },
    { header: text.status, accessor: "status" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <CommonPageSkeleton titleWidthClass="w-64" columns={6} rows={12} />;
  }

  return (
    <div className="space-y-4">
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
          <select
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-2 py-1.5 outline-none h-9"
            value={status}
            onChange={(e) =>
              dispatch(setSessionManagementStatus(e.target.value))
            }
          >
            <option value="all">{text.allStatus}</option>
            <option value="open">
              {text.allStatus === "Alle Status"
                ? "Offen"
                : text.allStatus === "Todos los estados"
                  ? "Abierto"
                  : text.allStatus === "Tous les statuts"
                    ? "Ouvert"
                    : "Open"}
            </option>
            <option value="full">
              {text.allStatus === "Alle Status"
                ? "Voll"
                : text.allStatus === "Todos los estados"
                  ? "Lleno"
                  : text.allStatus === "Tous les statuts"
                    ? "Complet"
                    : "Full"}
            </option>
            <option value="ongoing">
              {text.allStatus === "Alle Status"
                ? "Laufend"
                : text.allStatus === "Todos los estados"
                  ? "En curso"
                  : text.allStatus === "Tous les statuts"
                    ? "En cours"
                    : "Ongoing"}
            </option>
            <option value="completed">
              {text.allStatus === "Alle Status"
                ? "Abgeschlossen"
                : text.allStatus === "Todos los estados"
                  ? "Completado"
                  : text.allStatus === "Tous les statuts"
                    ? "Terminé"
                    : "Completed"}
            </option>
            <option value="cancelled">
              {text.allStatus === "Alle Status"
                ? "Abgebrochen"
                : text.allStatus === "Todos los estados"
                  ? "Cancelado"
                  : text.allStatus === "Tous les statuts"
                    ? "Annulé"
                    : "Cancelled"}
            </option>
          </select>
          <select
            className="bg-muted border border-white/10 text-primary text-xs rounded-md px-2 py-1.5 outline-none h-9"
            value={matchType}
            onChange={(e) =>
              dispatch(setSessionManagementMatchType(e.target.value))
            }
          >
            <option value="all">{text.allMatchTypes}</option>
            <option value="ranked">{text.ranked}</option>
            <option value="social">{text.social}</option>
          </select>
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
        onPageChange={(nextPage) =>
          dispatch(setSessionManagementPage(nextPage))
        }
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setSessionManagementLimit(nextLimit))
        }
        onAction={(row) => {
          if (row.internalId) {
            router.push(`/session-management/${row.internalId}`);
          }
        }}
      />
    </div>
  );
};

export default SessionList;
