---
title: KML for NOTAM.CA
development_start: "2022-06-10"
in_active_development: yes
technology_base: Rust
technologies:
  - hyper
  - reqwest
  - serde
  - kml
  - Docker
---

A small web tool to convert canadian NOTAM (notice to airman) to a KML network
link feed so that it can be used inside Google Earth Pro for flight planning.
This is a small side project to [notam.ca](https://notam.ca) and is used by 
an aviation service daily.
