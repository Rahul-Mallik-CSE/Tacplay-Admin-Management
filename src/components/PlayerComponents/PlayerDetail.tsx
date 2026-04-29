/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { FaCrown, FaTrophy } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import CustomTable from "@/components/CommonComponents/CustomTable";
import PlayerDetailSkeleton from "@/components/CommonComponents/PlayerDetailSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, toAbsoluteMediaUrl } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPlayerDetailLimit,
  setPlayerDetailPage,
  setPlayerDetailSearch,
} from "@/redux/features/player/playerSlice";
import { useGetPlayerDetailQuery } from "@/redux/features/player/playerAPI";
import type { PlayerMatchHistoryItem } from "@/types/PlayerTypes";
import { useTranslation } from "react-i18next";
import { type SupportedLanguage } from "@/lib/i18n/i18n";

const copy = {
  en: {
    title: "User Details",
    missingId: "Missing player id.",
    failed: "Failed to load player details.",
    disableAccount: "Disable Account",
    email: "Email",
    contactNumber: "Contact Number",
    location: "Location",
    subscriptionPlan: "Subscription Plan",
    totalMatchPlay: "Total Match Play",
    matchHistory: "Match History",
    bookingId: "Booking ID",
    sessionName: "Session Name",
    fieldName: "Field Name",
    sessionDate: "Session Date",
    matchType: "Match Type",
    paymentAmount: "Payment Amount",
    checkIn: "Check In",
    status: "Status",
    paymentStatus: "Payment Status",
    team: "Team",
    userId: "User ID",
  },
  de: {
    title: "Benutzerdetails",
    missingId: "Spieler-ID fehlt.",
    failed: "Spielerdetails konnten nicht geladen werden.",
    disableAccount: "Konto deaktivieren",
    email: "E-Mail",
    contactNumber: "Telefonnummer",
    location: "Ort",
    subscriptionPlan: "Abo-Plan",
    totalMatchPlay: "Gesamte Matches",
    matchHistory: "Match-Verlauf",
    bookingId: "Buchungs-ID",
    sessionName: "Sessionname",
    fieldName: "Feldname",
    sessionDate: "Sessiondatum",
    matchType: "Spieltyp",
    paymentAmount: "Zahlungsbetrag",
    checkIn: "Check-in",
    status: "Status",
    paymentStatus: "Zahlungsstatus",
    team: "Team",
    userId: "Benutzer-ID",
  },
  fr: {
    title: "Détails de l'utilisateur",
    missingId: "ID du joueur manquant.",
    failed: "Impossible de charger les détails du joueur.",
    disableAccount: "Désactiver le compte",
    email: "E-mail",
    contactNumber: "Numéro de contact",
    location: "Localisation",
    subscriptionPlan: "Forfait d'abonnement",
    totalMatchPlay: "Total des matchs",
    matchHistory: "Historique des matchs",
    bookingId: "ID de réservation",
    sessionName: "Nom de session",
    fieldName: "Nom du terrain",
    sessionDate: "Date de session",
    matchType: "Type de match",
    paymentAmount: "Montant du paiement",
    checkIn: "Enregistrement",
    status: "Statut",
    paymentStatus: "Statut du paiement",
    team: "Équipe",
    userId: "ID utilisateur",
  },
  es: {
    title: "Detalles del usuario",
    missingId: "Falta el ID del jugador.",
    failed: "No se pudieron cargar los detalles del jugador.",
    disableAccount: "Desactivar cuenta",
    email: "Correo electrónico",
    contactNumber: "Número de contacto",
    location: "Ubicación",
    subscriptionPlan: "Plan de suscripción",
    totalMatchPlay: "Total de partidas",
    matchHistory: "Historial de partidas",
    bookingId: "ID de reserva",
    sessionName: "Nombre de la sesión",
    fieldName: "Nombre del campo",
    sessionDate: "Fecha de la sesión",
    matchType: "Tipo de partida",
    paymentAmount: "Importe del pago",
    checkIn: "Registro",
    status: "Estado",
    paymentStatus: "Estado del pago",
    team: "Equipo",
    userId: "ID de usuario",
  },
} as const;

const PlayerDetail = () => {
  const router = useRouter();
  const params = useParams<{ "player-id": string }>();
  const playerId = params?.["player-id"];
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { search, page, limit } = useAppSelector(
    (state) => state.player.detail,
  );
  const [searchInput, setSearchInput] = useState(search);
  const language = (i18n.language as SupportedLanguage) || "en";
  const text = copy[language] ?? copy.en;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== search) {
        dispatch(setPlayerDetailSearch(trimmed));
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [dispatch, search, searchInput]);

  const { data, isLoading, isFetching, isError } = useGetPlayerDetailQuery(
    {
      id: playerId || "",
      search,
      page,
      limit,
    },
    {
      skip: !playerId,
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

  const statCards = [
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
      label: text.location,
      value: detail?.user.location || detail?.user.country || "-",
      iconBg: "bg-[#38C793]/20",
      iconclr: "text-[#38C793]",
      icon: IoLocationSharp,
    },
    {
      label: text.subscriptionPlan,
      value: detail?.stats.subscription_plan || "-",
      iconBg: "bg-[#F17B2C]/20",
      iconclr: "text-[#F17B2C]",
      icon: FaCrown,
    },
    {
      label: text.totalMatchPlay,
      value: String(detail?.stats.total_match_play ?? 0),
      iconBg: "bg-[#35B9E9]/20",
      iconclr: "text-[#35B9E9]",
      icon: FaTrophy,
    },
  ];

  const historyRows = (detail?.match_history ?? []).map(
    (item: PlayerMatchHistoryItem) => ({
      bookingId: item.display_booking_id,
      playerName: item.player_name,
      sessionDate: item.session_date,
      matchType: item.match_type,
      paymentAmount: item.payment_amount,
      checkInStatus: item.check_in_status,
      status: item.status,
      paymentStatus: item.payment_status,
      fieldName: item.field_name,
      sessionName: item.session_name,
      team: item.team,
      canView: item.can_view,
    }),
  );

  const historyColumns = [
    {
      header: text.bookingId,
      accessor: (row: (typeof historyRows)[number]) => (
        <span>{row.bookingId}</span>
      ),
    },
    { header: text.sessionName, accessor: "sessionName" as const },
    { header: text.fieldName, accessor: "fieldName" as const },
    { header: text.sessionDate, accessor: "sessionDate" as const },
    { header: text.matchType, accessor: "matchType" as const },
    { header: text.paymentAmount, accessor: "paymentAmount" as const },
    { header: text.checkIn, accessor: "checkInStatus" as const },
    { header: text.status, accessor: "status" as const },
    { header: text.paymentStatus, accessor: "paymentStatus" as const },
    { header: text.team, accessor: "team" as const },
  ];

  const showSkeleton = isLoading && !data;

  if (showSkeleton) {
    return <PlayerDetailSkeleton />;
  }

  if (!playerId) {
    return (
      <div className="rounded-xl border border-white/5 bg-card p-6 text-sm text-muted-foreground">
        {text.missingId}
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                  alt={detail?.user.full_name || "Player"}
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
              <h2 className="text-primary text-lg sm:text-xl font-bold">
                {detail?.user.full_name || "User"}
              </h2>
              <p className="text-muted-foreground text-sm">
                User ID: {detail?.user.display_id || "-"}
              </p>
            </div>
          </div>
          <Button size="sm">🚫 {text.disableAccount}</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statCards.map((card, i) => (
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
            {text.matchHistory}
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
          data={historyRows}
          columns={historyColumns}
          itemsPerPage={meta?.limit ?? limit}
          currentPage={meta?.page ?? page}
          totalPages={Math.max(
            1,
            Math.ceil((meta?.total ?? 0) / ((meta?.limit ?? limit) || 1)),
          )}
          totalItems={meta?.total ?? historyRows.length}
          onPageChange={(nextPage) => dispatch(setPlayerDetailPage(nextPage))}
          onItemsPerPageChange={(nextLimit) =>
            dispatch(setPlayerDetailLimit(nextLimit))
          }
        />
      </div>
    </div>
  );
};

export default PlayerDetail;
