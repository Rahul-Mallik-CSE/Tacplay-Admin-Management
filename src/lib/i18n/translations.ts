/** @format */

export const supportedLanguages = ["en", "de", "fr", "es"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

export const languageLocaleMap: Record<SupportedLanguage, string> = {
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
};

export const translations = {
  en: {
    common: {
      dashboard: "Dashboard",
      noEntries: "No entries found",
      open: "Open",
      cancelled: "Cancelled",
      lastPeriod: "from last period",
    },
    navbar: {
      title: "Dashboard",
      settings: "Settings",
      logout: "Log out",
      language: "Language",
    },
    sidebar: {
      overview: "Overview",
      fieldOwner: "Field Owner",
      player: "Player",
      sessionManagement: "Session Management",
      earnings: "Earnings",
      settings: "Settings",
      logOut: "Log Out",
    },
    authBanner: {
      slides: [
        {
          title: "Command Your Arena",
          description:
            "Set up your field, schedule tactical sessions, and manage competitive paintball events with full control.",
        },
        {
          title: "Manage Your Battles",
          description:
            "Organize ranked and social matches, track player stats, and build your arena's competitive reputation.",
        },
        {
          title: "Grow Your Community",
          description:
            "Attract new players, manage bookings, and create memorable paintball experiences at your field.",
        },
      ],
      tagline: ["GEAR UP.", "MATCH UP.", "LEVEL UP."],
    },
    overview: {
      week: "Week",
      month: "Month",
      totalRevenue: "Total Revenue",
      fieldOwner: "Field Owner",
      player: "Player",
      premiumUser: "Premium User",
      failedLoad: "Failed to load overview",
      revenue: "Revenue",
      thisPeriod: "This Month",
      lastPeriod: "Last Month",
    },
  },
  de: {
    common: {
      dashboard: "Übersicht",
      noEntries: "Keine Einträge gefunden",
      open: "Offen",
      cancelled: "Abgebrochen",
      lastPeriod: "aus dem letzten Zeitraum",
    },
    navbar: {
      title: "Übersicht",
      settings: "Einstellungen",
      logout: "Abmelden",
      language: "Sprache",
    },
    sidebar: {
      overview: "Übersicht",
      fieldOwner: "Feldbesitzer",
      player: "Spieler",
      sessionManagement: "Sitzungsverwaltung",
      earnings: "Einnahmen",
      settings: "Einstellungen",
      logOut: "Abmelden",
    },
    authBanner: {
      slides: [
        {
          title: "Beherrsche deine Arena",
          description:
            "Richte dein Feld ein, plane taktische Sessions und verwalte Wettkämpfe mit voller Kontrolle.",
        },
        {
          title: "Verwalte deine Matches",
          description:
            "Organisiere Rankings und Social-Matches, verfolge Spielerstatistiken und baue den Ruf deiner Arena aus.",
        },
        {
          title: "Wachse mit deiner Community",
          description:
            "Gewinne neue Spieler, verwalte Buchungen und schaffe unvergessliche Paintball-Erlebnisse.",
        },
      ],
      tagline: ["AUFRÜSTEN.", "MATCHEN.", "LEVELN."],
    },
    overview: {
      week: "Woche",
      month: "Monat",
      totalRevenue: "Gesamteinnahmen",
      fieldOwner: "Feldbesitzer",
      player: "Spieler",
      premiumUser: "Premium-Benutzer",
      failedLoad: "Übersicht konnte nicht geladen werden",
      revenue: "Umsatz",
      thisPeriod: "Dieser Monat",
      lastPeriod: "Letzter Monat",
    },
  },
  fr: {
    common: {
      dashboard: "Tableau de bord",
      noEntries: "Aucune entrée trouvée",
      open: "Ouvert",
      cancelled: "Annulé",
      lastPeriod: "de la période précédente",
    },
    navbar: {
      title: "Tableau de bord",
      settings: "Paramètres",
      logout: "Se déconnecter",
      language: "Langue",
    },
    sidebar: {
      overview: "Vue d'ensemble",
      fieldOwner: "Propriétaire du terrain",
      player: "Joueur",
      sessionManagement: "Gestion des sessions",
      earnings: "Revenus",
      settings: "Paramètres",
      logOut: "Se déconnecter",
    },
    authBanner: {
      slides: [
        {
          title: "Dirigez votre arène",
          description:
            "Configurez votre terrain, planifiez des sessions tactiques et gérez vos événements avec un contrôle total.",
        },
        {
          title: "Gérez vos batailles",
          description:
            "Organisez les matchs classés et sociaux, suivez les statistiques des joueurs et renforcez la réputation de votre arène.",
        },
        {
          title: "Faites grandir votre communauté",
          description:
            "Attirez de nouveaux joueurs, gérez les réservations et créez des expériences paintball mémorables.",
        },
      ],
      tagline: ["ÉQUIPEZ-VOUS.", "MATCHER.", "ÉVOLUER."],
    },
    overview: {
      week: "Semaine",
      month: "Mois",
      totalRevenue: "Revenu total",
      fieldOwner: "Propriétaire du terrain",
      player: "Joueur",
      premiumUser: "Utilisateur Premium",
      failedLoad: "Échec du chargement de l'aperçu",
      revenue: "Revenu",
      thisPeriod: "Cette période",
      lastPeriod: "Période précédente",
    },
  },
  es: {
    common: {
      dashboard: "Panel",
      noEntries: "No se encontraron registros",
      open: "Abierto",
      cancelled: "Cancelado",
      lastPeriod: "del periodo anterior",
    },
    navbar: {
      title: "Panel",
      settings: "Ajustes",
      logout: "Cerrar sesión",
      language: "Idioma",
    },
    sidebar: {
      overview: "Resumen",
      fieldOwner: "Propietario del campo",
      player: "Jugador",
      sessionManagement: "Gestión de sesiones",
      earnings: "Ingresos",
      settings: "Ajustes",
      logOut: "Cerrar sesión",
    },
    authBanner: {
      slides: [
        {
          title: "Domina tu arena",
          description:
            "Configura tu campo, programa sesiones tácticas y administra eventos con control total.",
        },
        {
          title: "Gestiona tus batallas",
          description:
            "Organiza partidas clasificadas y sociales, sigue estadísticas y fortalece la reputación de tu arena.",
        },
        {
          title: "Haz crecer tu comunidad",
          description:
            "Atrae nuevos jugadores, administra reservas y crea experiencias memorables de paintball.",
        },
      ],
      tagline: ["EQUÍPATE.", "JUEGA.", "EVOLUCIONA."],
    },
    overview: {
      week: "Semana",
      month: "Mes",
      totalRevenue: "Ingresos totales",
      fieldOwner: "Propietario del campo",
      player: "Jugador",
      premiumUser: "Usuario Premium",
      failedLoad: "Error al cargar el resumen",
      revenue: "Ingresos",
      thisPeriod: "Este mes",
      lastPeriod: "Mes pasado",
    },
  },
} as const;
