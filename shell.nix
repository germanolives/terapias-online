{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell { buildInputs = [ pkgs.nodejs_24 pkgs.pnpm pkgs.bun pkgs.python312 pkgs.git ]; }
