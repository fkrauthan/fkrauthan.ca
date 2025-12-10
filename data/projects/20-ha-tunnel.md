---
title: HA Tunnel
development_start: "2025-12-08"
in_active_development: yes
technology_base: Rust
technologies:
  - Tokio
  - Axum
  - Reqwest
  - tungstenite
  - Claude Code
links:
  github: https://github.com/fkrauthan/ha-tunnel
---

HA Tunnel (Home Assistant Tunnel) is a secure WebSocket tunnel to expose Home Assistant to Amazon Alexa and Google Assistant without 
requiring port forwarding or a public IP address. Fully written in Rust and Home Assistant addon compatible it runs very fast with
minimal resources.
