"use client";

import React from "react";
import Link from "next/link";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "./Mapbox.module.css";
import { FaMapPin } from "react-icons/fa";

import { Button } from "rsuite";
import Tooltip from "@elements/Tooltip";

import airports from "@db/fake_geojson.json";

export default function Mapbox() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const [selectedMarker, setSelectedMarker] = React.useState(null as any);
  const [valid, setValid] = React.useState(false);
  const [changeView, setChangeView] = React.useState(false);

  const [view, setView] = React.useState("mapbox://styles/mapbox/satellite-v9");

  const [markers, setMarkers] = React.useState(
    airports.map((markerData) => ({
      longitude: parseFloat(markerData.lon), // Convert lon to longitude
      latitude: parseFloat(markerData.lat), // Convert lat to latitude
      ...markerData,
    }))
  );

  //useRef to store previous value of markers
  const prevMarkers = React.useRef(markers);

  //useRef to store mapbox instance
  const mapRef = React.useRef(null) as any;

  const zoomToSelectedLoc = (e: any, airport: any, index: any) => {
    // stop event bubble-up which triggers unnecessary events
    e.stopPropagation();
    //@ts-ignore
    setSelectedMarker({ airport, index });
    mapRef.current.flyTo({
      center: [airport.longitude, airport.latitude],
      zoom: 12,
    });
  };

  const handleHover = (e: any, airport: any, index: any) => {
    e.stopPropagation();
    setSelectedMarker({ airport, index });
  };

  const handleMarkerDrag = async (index: any, event: any) => {
    const newMarkers = [...markers];
    newMarkers[index] = {
      ...(newMarkers[index] as any),
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    };

    setMarkers(valid ? newMarkers : markers);
  };

  return (
    <main className={classes.mainStyle}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
        mapStyle={view}
        style={classes.mapStyle as any}
        initialViewState={{
          latitude: 35.668641,
          longitude: 139.750567,
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={1}
      >
        <GeolocateControl position="top-left" />
        <NavigationControl position="top-left" />

        {markers?.map((marker, index) => {
          return (
            <Marker
              key={index}
              longitude={marker?.longitude as any}
              latitude={marker?.latitude as any}
              anchor="bottom"
              draggable={valid ? true : false}
              onDragEnd={(event) => handleMarkerDrag(index, event)}
            >
              <button
                type="button"
                className="cursor-pointer"
                onClick={(e) => zoomToSelectedLoc(e, marker, index)}
                onMouseEnter={(e) => handleHover(e, marker, index)}
              >
                {
                  <FaMapPin
                    size={
                      selectedMarker?.airport.woeid === marker?.woeid
                        ? "35"
                        : "30"
                    }
                    color={
                      selectedMarker?.airport.woeid === marker?.woeid
                        ? "red"
                        : !changeView
                        ? "white"
                        : "black"
                    }
                  />
                }
              </button>
            </Marker>
          );
        })}

        {valid ? (
          <div style={{ position: "absolute", right: "1rem", top: "1rem" }}>
            <Button
              appearance="primary"
              color="green"
              size="lg"
              onClick={() => {
                setValid(false);
                prevMarkers.current = markers;
              }}
            >
              Save Changes
            </Button>
            <Button
              appearance="primary"
              color="red"
              size="lg"
              onClick={() => {
                setValid(false);
                setMarkers(prevMarkers.current);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : null}

        {valid ? null : (
          <Button
            appearance="primary"
            size="lg"
            style={{ position: "absolute", right: "1rem", top: "1rem" }}
            onClick={() => setValid(!valid)}
          >
            Edit Markers
          </Button>
        )}

        {selectedMarker ? (
          <Popup
            offset={40}
            latitude={selectedMarker.airport?.latitude}
            longitude={selectedMarker.airport?.longitude}
            onClose={() => {
              setSelectedMarker(null);
            }}
            closeButton={false}
          >
            <Tooltip asset={selectedMarker.airport} />
          </Popup>
        ) : null}

        <Button
          appearance="primary"
          color="cyan"
          size="sm"
          style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
          onClick={() => {
            setChangeView(!changeView);
            setView(
              changeView
                ? "mapbox://styles/mapbox/satellite-v9"
                : "mapbox://styles/mapbox/streets-v11"
            );
          }}
        >
          Change to {changeView ? "Satellite view" : "Street view"}
        </Button>
      </Map>
    </main>
  );
}
