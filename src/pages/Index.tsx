
import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { ReleasePanel } from "@/components/ReleasePanel";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QualityCard } from "@/components/dashboard/QualityCard";
import { ProductMetricsGrid } from "@/components/dashboard/ProductMetricsGrid";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ReleasesTable } from "@/components/dashboard/ReleasesTable";
import { IncidentsTable } from "@/components/dashboard/IncidentsTable";
import { Period, Release, Incident, ActivityItem } from "@/types/dashboard";
import {
  activityFeed,
  releases,
  mockIncidents,
  getStatsForPeriod,
  getProductQualityForPeriod,
  getActiveProductsForPeriod,
  monthlyQualityTrend,
} from "@/data/dashboard";

const ITEMS_PER_PAGE = 3;
const RELEASES_PER_PAGE = 3;
const INCIDENTS_PER_PAGE = 3;

const businessUnits = ["All", "Financial Services", "Security", "Data Intelligence", "Core Services"];
const products = ["All", "Payment Gateway", "User Authentication", "Analytics Dashboard", "Search Engine"];

const Index = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<Incident | null>(null);
  const [releasesPage, setReleasesPage] = useState(1);
  const [incidentsPage, setIncidentsPage] = useState(1);

  const stats = getStatsForPerio