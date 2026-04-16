{
  description = "Entorno de desarrollo Web Pro";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs_24 pnpm bun deno python312 git gh
          nodePackages.typescript-language-server
        ];
        shellHook = ''
          export NODE_OPTIONS="--max-old-space-size=2048"
          export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [ pkgs.stdenv.cc.cc ]}
          echo "🚀 Web Environment Activated (NixOS 25.11)"
          echo "💡 Tip: Use 'python3 -m http.server 8000' for quick previews."
        '';
      };
    };
}
