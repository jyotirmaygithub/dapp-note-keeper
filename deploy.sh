
cargo build --release --target wasm32-unknown-unknown --package notes-keeper-backend

# notes_keeper_backend.wasm ---->>  the name of the wasm file should use underscroes not hifens.
candid-extractor target/wasm32-unknown-unknown/release/notes_keeper_backend.wasm > src/notes-keeper-backend/notes-keeper-backend.did

dfx deploy notes-keeper-backend
