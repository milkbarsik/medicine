import type { ComponentType } from "react";
import HomePage from "../pages/homePage/homePage";
import MedicinesPage from "../pages/medicinesPage/medicinesPage";
import ReceptionPage from "../pages/receptionPage/receptionPage";
import SicksPage from "../pages/sicksPage/sicksPage";
import DiseasePage from "../pages/diseasesPage/diseasePage";
import AuthPage from "../pages/authPage/authPage";
import PatientsPage from "../pages/patientsPage/patientsPage";

export type Route = {
	Path: string;
	Component: ComponentType
}

export const Authroutes: Route[] = [
	{
		Path: '/',
		Component: HomePage
	},
	{
		Path: '/medicines',
		Component: MedicinesPage
	},
	{
		Path: '/reception',
		Component: ReceptionPage
	},
	{
		Path: '/sicks',
		Component: SicksPage
	},
	{
		Path: '/diseases',
		Component: DiseasePage
	},
	{
		Path: '/Patients',
		Component: PatientsPage
	}
]

export const notAuthRoutes: Route[] = [
	{
		Path: '/auth',
		Component: AuthPage
	},
]