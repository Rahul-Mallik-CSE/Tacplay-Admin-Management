/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import { IoIosMan } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaCrown, FaTrophy } from "react-icons/fa";
import CustomTable from "@/components/CommonComponents/CustomTable";
import FieldOwnerDetailSkeleton from "@/components/CommonComponents/FieldOwnerDetailSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, toAbsoluteMediaUrl } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFieldOwnerDetailLimit,
  setFieldOwnerDetailPage,
  setFieldOwnerDetailSearch,
} from "@/redux/features/fieldOwner/fieldOwnerSlice";
import { useGetFieldOwnerDetailQuery } from "@/redux/features/fieldOwner/fieldOwnerAPI";
import type { FieldOwnerSessionHistoryItem } from "@/types/FieldOwner";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "Field Details",
    missingId: "Missing field owner id.",
    failed: "Failed to load field owner details.",
    fieldName: "Field Name",
    email: "Email",
    contactNumber: "Contact Number",
    country: "Country",
    subscriptionPlan: "Subscription Plan",
    totalSession: "Total Session",
    rankedMatch: "Ranked Match",
    socialMatch: "Social Match",
    sessionHistory: "Session History",
    userStatus: "User Status",
    approvalStatus: "Approval Status",
    sessionId: "Session ID",
    sessionName: "Session Name",
    fieldId: "Field ID",
    player: "Player",
    amount: "Amount",
    status: "Status",
    matchType: "Match Type",
    matchDate: "Match Date",
  },
  de: {
    title: "Felddetails",
    missingId: "Feldbesitzer-ID fehlt.",
    failed: "Felddetails konnten nicht geladen werden.",
    fieldName: "Feldname",
    email: "E-Mail",
    contactNumber: "Telefonnummer",
    country: "Land",
    subscriptionPlan: "Abo-Plan",
    totalSession: "Gesamtsessions",
    rankedMatch: "Ranglisten-Match",
    socialMatch: "Social-Match",
    sessionHistory: "Session-Verlauf",
    userStatus: "Benutzerstatus",
    approvalStatus: "Freigabestatus",
    sessionId: "Session-ID",
    sessionName: "Sessionname",
    fieldId: "Feld-ID",
    player: "Spieler",
    amount: "Betrag",
    status: "Status",
    matchType: "Spieltyp",
    matchDate: "Matchdatum",
  },
  fr: {
    title: "Détails du terrain",
    missingId: "ID du propriétaire de terrain manquant.",
    failed: "Impossible de charger les détails du terrain.",
    fieldName: "Nom du terrain",
    email: "E-mail",
    contactNumber: "Numéro de contact",
    country: "Pays",
    subscriptionPlan: "Forfait d'abonnement",
    totalSession: "Sessions totales",
    rankedMatch: "Match classé",
    socialMatch: "Match social",
    sessionHistory: "Historique des sessions",
    userStatus: "Statut de l'utilisateur",
    approvalStatus: "Statut d'approbation",
    sessionId: "ID de session",
    sessionName: "Nom de session",
    fieldId: "ID du terrain",
    player: "Joueur",
    amount: "Montant",
    status: "Statut",
    matchType: "Type de match",
    matchDate: "Date du match",
  },
  es: {
    title: "Detalles del campo",
    missingId: "Falta el ID del propietario del campo.",
    failed: "No se pudieron cargar los detalles del campo.",
    fieldName: "Nombre del campo",
    email: "Correo electrónico",
    contactNumber: "Número de contacto",
    country: "País",
    subscriptionPlan: "Plan de suscripción",
    totalSession: "Sesiones totales",
    rankedMatch: "Partida clasificada",
    socialMatch: "Partida social",
    sessionHistory: "Historial de sesiones",
    userStatus: "Estado del usuario",
    approvalStatus: "Estado de aprobación",
    sessionId: "ID de sesión",
    sessionName: "Nombre de sesión",
    fieldId: "ID del campo",
    player: "Jugador",
    amount: "Importe",
    status: "Estado",
    matchType: "Tipo de partida",
    matchDate: "Fecha de la partida",
  },
} as const;

const FieldOwnerDetail = () => {
  const router = useRouter();
  const params = useParams<{ "field-owner-id": string }>();
  const fieldOwnerId = params?.["field-owner-id"];
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { search, page, limit } = useAppSelector(
    (state) => state.fieldOwner.detail,
  );
  const [searchInput, setSearchInput] = useState(search);
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setFieldOwnerDetailSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetFieldOwnerDetailQuery(
    {
      id: fieldOwnerId || "",
      search,
      page,
      limit,
    },
    {
      skip: !fieldOwnerId,
    },
  );

  const detail = data?.data;
  const meta = data?.meta;

  const profileImage = toAbsoluteMediaUrl(detail?.user.profile_image);
  const profileInitials = (detail?.user.full_name || "User")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  const infoCards = [
    {
      label: text.fieldName,
      value: detail?.field.field_name || "-",
      iconBg: "bg-[#F2AE40]/20",
      iconclr: "text-[#F2AE40]",
      icon: IoIosMan,
    },
    {
      label: text.email,
      value: detail?.user.email || "-",
      iconBg: "bg-[#6E3FF3]/20",
      iconclr: "text-[#6E3FF3]",
      icon: MdEmail,
    },
    {
      label: text.contactNumber,
      value: detail?.user.contact_number || "-",
      iconBg: "bg-[#35B9E9]/20",
      iconclr: "text-[#35B9E9]",
      icon: BiSolidContact,
    },
    {
      label: text.country,
      value: detail?.user.country || "-",
      iconBg: "bg-[#38C793]/20",
      iconclr: "text-[#38C793]",
      icon: IoDocumentTextOutline,
    },
    {
      label: text.subscriptionPlan,
      value: detail?.stats.subscription_plan || "-",
      iconBg: "bg-[#F17B2C]/20",
      iconclr: "text-[#F17B2C]",
      icon: FaCrown,
    },
    {
      label: text.totalSession,
      value: String(detail?.stats.total_session ?? 0),
      iconBg: "bg-[#35B9E9]/20",
      iconclr: "text-[#35B9E9]",
      icon: FaTrophy,
    },
    {
      label: text.rankedMatch,
      value: String(detail?.stats.rank_match ?? 0),
      iconBg: "bg-[#980009]/20",
      iconclr: "text-[#980009]",
      icon: FaCrown,
    },
    {
      label: text.socialMatch,
      value: String(detail?.stats.social_match ?? 0),
      iconBg: "bg-[#E1BD25]/20",
      iconclr: "text-[#E1BD25]",
      icon: FaCrown,
    },
  ];

  const sessionRows = (detail?.session_history ?? []).map(
    (item: FieldOwnerSessionHistoryItem) => ({
      sessionId: item.display_session_id,
      sessionName: item.session_name,
      fieldId: item.field_id,
      player: item.player,
      amount: item.amount,
      status: item.status,
      matchType: item.match_type,
      matchDate: item.match_date,
      canView: item.can_view,
    }),
  );

  const sessionColumns = [
    {
      header: text.sessionId,
      accessor: (row: (typeof sessionRows)[number]) => (
        <span>{row.sessionId}</span>
      ),
    },
    { header: text.sessionName, accessor: "sessionName" as const },
    { header: text.fieldId, accessor: "fieldId" as const },
    { header: text.player, accessor: "player" as const },
    { header: text.amount, accessor: "amount" as const },
    { header: text.status, accessor: "status" as const },
    { header: text.matchType, accessor: "matchType" as const },
    { header: text.matchDate, accessor: "matchDate" as const },
  ];

  if (isLoading && !data) {
    return <FieldOwnerDetailSkeleton />;
  }

  if (!fieldOwnerId) {
    return (
      <div className="rounded-xl border border-white/5 bg-card p-6 text-sm text-muted-foreground">
        {text.missingId}
      </div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 cursor-pointer rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-primary text-xl sm:text-2xl font-bold">
          {text.title}
        </h1>
      </div>

      {isError ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {text.failed}
        </div>
      ) : null}

      <div className="bg-card rounded-xl p-4 sm:p-6 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-muted shrink-0 relative">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={detail?.user.full_name || "Field owner"}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-chart-1 to-secondary text-2xl font-bold text-white">
                  {profileInitials || "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-primary text-xl md:text-3xl font-bold">
                {detail?.user.full_name || "User"}
              </h2>
              <p className="text-secondary text-sm md:text-lg">
                User ID: {detail?.user.display_id || "-"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <Button size="sm" className="capitalize">
              {detail?.user.status || "unknown"}
            </Button>
            <Button
              size="sm"
              className="border-emerald-500 bg-[#38C793] text-primary hover:bg-[#38C793]/90 text-xs"
            >
              {detail?.field.approval_status || "approved"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {infoCards.map((card, i) => (
          <div
            key={i}
            className="bg-card rounded-xl p-3 sm:p-4 border border-white/5 space-y-2"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-md flex items-center justify-center text-base",
                  card.iconBg,
                  card.iconclr,
                )}
              >
                {React.createElement(card.icon)}
              </div>
              <p className="text-secondary text-lg md:text-xl font-medium">
                {card.label}
              </p>
            </div>
            <p className="text-primary text-xs sm:text-sm truncate">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-primary text-lg font-semibold">
            Session History
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 bg-muted border-white/10 text-primary text-sm h-9 w-full sm:w-60"
            />
          </div>
        </div>

        {isFetching && !isLoading ? (
          <p className="text-xs text-muted-foreground">Refreshing data...</p>
        ) : null}

        <CustomTable
          data={sessionRows}
          columns={sessionColumns}
          itemsPerPage={meta?.limit ?? limit}
          currentPage={meta?.page ?? page}
          totalPages={Math.max(
            1,
            Math.ceil((meta?.total ?? 0) / ((meta?.limit ?? limit) || 1)),
          )}
          totalItems={meta?.total ?? sessionRows.length}
          onPageChange={(nextPage) =>
            dispatch(setFieldOwnerDetailPage(nextPage))
          }
          onItemsPerPageChange={(nextLimit) =>
            dispatch(setFieldOwnerDetailLimit(nextLimit))
          }
        />
      </div>
    </div>
  );
};

export default FieldOwnerDetail;
