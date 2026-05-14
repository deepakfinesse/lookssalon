"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";
import FadeUp from "@/components/animation/FadeUp";
import { FaPhone, FaClock, FaMapMarkerAlt, FaImage, FaSearch } from "react-icons/fa";

// ── Salon card ─────────────────────────────────────────────────────────────────

function SalonCard({ salon }) {
  const bookUrl = salon.bookAppointmentUrl || "/salon-book-appointment";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-black">{salon.name}</h3>

      <p className="text-black text-base leading-relaxed">{salon.address}</p>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <FaPhone className="text-white text-sm" />
        </div>
        <div className="flex flex-col text-black font-medium gap-1">
          {salon.phones.map((p, i) => (
            <a key={i} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
              {p}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <FaClock className="text-white text-sm" />
        </div>
        <span className="text-black font-medium">{salon.timing}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-1">
        {salon.googleMapUrl ? (
          <a
            href={salon.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black text-white px-3 py-2 font-bold uppercase text-sm w-fit hover:bg-primary hover:text-black transition-colors duration-200"
          >
            <FaMapMarkerAlt className="text-lg" /> Google Map
          </a>
        ) : (
          <span className="flex items-center gap-3 bg-black/30 text-white px-3 py-2 font-bold uppercase text-sm w-fit cursor-not-allowed">
            <FaMapMarkerAlt className="text-lg" /> Google Map
          </span>
        )}

        {salon.salonTourUrl ? (
          <a
            href={salon.salonTourUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-black text-white px-3 py-2 font-bold uppercase text-sm w-fit hover:bg-primary hover:text-black transition-colors duration-200"
          >
            <FaImage className="text-lg" /> Salon Tour
          </a>
        ) : (
          <span className="flex items-center gap-3 bg-black/30 text-white px-3 py-2 font-bold uppercase text-sm w-fit cursor-not-allowed">
            <FaImage className="text-lg" /> Salon Tour
          </span>
        )}

        <a
          href={bookUrl}
          className="flex items-center justify-center border-2 border-primary text-primary px-3 py-2 font-bold uppercase text-sm w-fit hover:bg-primary hover:text-black transition-colors duration-200"
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
}

// ── City group ─────────────────────────────────────────────────────────────────

function CityGroup({ city, salons }) {
  return (
    <div className="mb-14">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">{city}</h2>
      <div className="h-1 bg-primary mb-10 w-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {salons.map((salon, idx) => (
          <div
            key={salon._id}
            className={`flex flex-col gap-5 ${
              idx % 2 === 0 && salons.length > 1
                ? "md:border-r md:border-gray-200 md:pr-10"
                : salons.length > 1 ? "md:pl-10" : ""
            }`}
          >
            <SalonCard salon={salon} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Group salons by city (preserving alphabetical order) ──────────────────────

function groupByCity(salons) {
  const map = new Map();
  for (const s of salons) {
    if (!map.has(s.city)) map.set(s.city, []);
    map.get(s.city).push(s);
  }
  return map;
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LocateSalonPage() {
  const searchTimer = useRef(null);
  const resultsRef  = useRef(null);

  const [salons,     setSalons]     = useState([]);
  const [cities,     setCities]     = useState([]);
  const [search,     setSearch]     = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [fetched,    setFetched]    = useState(false); // true after first fetch

  // Load city list for dropdown
  useEffect(() => {
    fetch("/api/salons/cities")
      .then(r => r.json())
      .then(d => setCities(d.cities ?? []))
      .catch(() => {});
  }, []);

  const fetchSalons = useCallback(async (q, city) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 500 });
      if (q)    params.set("search", q);
      if (city) params.set("city", city);
      const res  = await fetch(`/api/salons?${params}`);
      const data = await res.json();
      setSalons(data.salons ?? []);
      setFetched(true);
    } catch {
      setSalons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all salons on mount
  useEffect(() => { fetchSalons("", ""); }, [fetchSalons]);

  const handleSearch = useCallback((q, city) => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchSalons(q, city);
      // Smooth scroll to results on filter change
      if (q || city) {
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }, 1200);
  }, [fetchSalons]);

  const onSearchInput = (e) => {
    const q = e.target.value;
    setSearch(q);
    handleSearch(q, cityFilter);
  };

  const onCityChange = (e) => {
    const city = e.target.value;
    setCityFilter(city);
    handleSearch(search, city);
    if (city) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setCityFilter("");
    fetchSalons("", "");
  };

  const grouped   = groupByCity(salons);
  const hasFilter = search.trim() || cityFilter;

  return (
    <>
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="w-full bg-[url('/img/all/salon-locator-bg.webp')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-10">

            {/* Image */}
            <div className="md:col-span-6 flex justify-end pt-4">
              {/* <Image
                src="/img/all/salon-locator-hero.webp"
                alt="Salon Locator"
                width={638}
                height={300}
                className="w-full max-w-[638px] h-auto object-contain"
                priority
              /> */}
            </div>

            {/* Content + Search */}
            <div className="md:col-span-6 flex flex-col items-center justify-center text-center pb-6">
              <FadeUp delay={0.1}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-black leading-tight mb-4">
                  locate salon near you
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-3 text-lg sm:text-xl font-medium uppercase text-black mb-6">
                  Select from our chain of 220+ stores across pan India
                </p>
              </FadeUp>

              {/* Search Form */}
              <FadeUp delay={0.3}>
                <div className="flex flex-col gap-3 w-full max-w-md">
                  {/* Text search */}
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 text-sm pointer-events-none" />
                    <input
                      type="search"
                      value={search}
                      onChange={onSearchInput}
                      placeholder="Enter City / Location…"
                      className="w-full pl-10 pr-4 py-3 border-2 border-primary bg-black text-white text-sm font-semibold outline-none focus:border-primary transition-colors placeholder:text-white placeholder:uppercase"
                    />
                  </div>

                  {/* City dropdown */}
                  <select
                    value={cityFilter}
                    onChange={onCityChange}
                    className="w-full px-4 py-3 border-2 border-primary border-black bg-black text-white text-sm font-semibold uppercase outline-none cursor-pointer appearance-none"
                  >
                    <option value="">— Browse All Cities —</option>
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  {hasFilter && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-bold uppercase text-black/60 hover:text-primary transition-colors underline underline-offset-2 self-center"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* ── Results Section ───────────────────────────────────────────────── */}
      <section ref={resultsRef} className="w-full py-14 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-20 text-black/40">
              <div className="w-8 h-8 border-2 border-black/10 border-t-primary rounded-full animate-spin" />
              <span className="text-sm font-medium uppercase tracking-widest">Searching…</span>
            </div>
          )}

          {/* Results */}
          {!loading && fetched && salons.length > 0 && (
            <>
              {hasFilter && (
                <p className="text-sm text-black/50 font-medium uppercase tracking-widest mb-10">
                  {salons.length} salon{salons.length !== 1 ? "s" : ""} found
                  {cityFilter ? ` in ${cityFilter}` : ""}
                  {search ? ` matching "${search}"` : ""}
                </p>
              )}

              {[...grouped.entries()].map(([city, list]) => (
                <CityGroup key={city} city={city} salons={list} />
              ))}

              {hasFilter && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={clearFilters}
                    className="border-2 border-primary text-primary px-8 py-3 font-bold uppercase text-sm hover:bg-primary hover:text-black transition-colors duration-200"
                  >
                    Back to All Salons
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty state */}
          {!loading && fetched && salons.length === 0 && (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <FaMapMarkerAlt className="text-5xl text-black/20" />
              <div>
                <p className="text-xl font-bold text-black mb-2">No salons found</p>
                <p className="text-black/50 text-sm">
                  Try a different city or search term.
                </p>
              </div>
              <button
                onClick={clearFilters}
                className="border-2 border-primary text-primary px-8 py-3 font-bold uppercase text-sm hover:bg-primary hover:text-black transition-colors duration-200"
              >
                View All Salons
              </button>
            </div>
          )}

        </div>
      </section>

      <BookAppointment />
      <PartnerBrands />
    </>
  );
}
