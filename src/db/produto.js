"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool();
function criarProduto(nome, preco, quantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var query, valores, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n        INSERT INTO produtos (nome, preco, quantidade_estoque) \n        VALUES ($1, $2, $3) \n        RETURNING *;\n    ";
                    valores = [nome, preco, quantidade];
                    return [4 /*yield*/, pool.query(query, valores)];
                case 1:
                    resultado = _a.sent();
                    return [2 /*return*/, resultado.rows[0]];
            }
        });
    });
}
function listarProdutos() {
    return __awaiter(this, void 0, void 0, function () {
        var query, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n        SELECT * FROM produtos \n        ORDER BY nome ASC;\n    ";
                    return [4 /*yield*/, pool.query(query)];
                case 1:
                    resultado = _a.sent();
                    return [2 /*return*/, resultado.rows];
            }
        });
    });
}
function atualizarEstoque(id, novaQuantidade) {
    return __awaiter(this, void 0, void 0, function () {
        var query, valores, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n        UPDATE produtos \n        SET quantidade_estoque = $1 \n        WHERE id = $2 \n        RETURNING *;\n    ";
                    valores = [novaQuantidade, id];
                    return [4 /*yield*/, pool.query(query, valores)];
                case 1:
                    resultado = _a.sent();
                    if (resultado.rowCount === 0) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, resultado.rows[0]];
            }
        });
    });
}
function deletarProduto(id) {
    return __awaiter(this, void 0, void 0, function () {
        var query, valores, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n        DELETE FROM produtos \n        WHERE id = $1;\n    ";
                    valores = [id];
                    return [4 /*yield*/, pool.query(query, valores)];
                case 1:
                    resultado = _a.sent();
                    return [2 /*return*/, resultado.rowCount > 0];
            }
        });
    });
}
function rodarTodosOsTestes() {
    return __awaiter(this, void 0, void 0, function () {
        var novo, idProdutoMoc, lista, atualizado, deletado, erro_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, 8, 10]);
                    console.log("--- INICIANDO TESTES DA ATIVIDADE ---\n");
                    // 1. Testando Criar Produto
                    console.log("1. Testando: criarProduto...");
                    return [4 /*yield*/, criarProduto("Teclado Mecânico RGB", 299.90, 10)];
                case 1:
                    novo = _b.sent();
                    console.log("Resultado:", novo);
                    idProdutoMoc = (_a = novo[0]) === null || _a === void 0 ? void 0 : _a.id;
                    // 2. Testando Listar Produtos
                    console.log("\n2. Testando: listarProdutos...");
                    return [4 /*yield*/, listarProdutos()];
                case 2:
                    lista = _b.sent();
                    console.log("Produtos cadastrados:", lista);
                    if (!idProdutoMoc) return [3 /*break*/, 5];
                    // 3. Testando Atualizar Estoque
                    console.log("\n3. Testando: atualizarEstoque para o ID ".concat(idProdutoMoc, "..."));
                    return [4 /*yield*/, atualizarEstoque(idProdutoMoc, 45)];
                case 3:
                    atualizado = _b.sent();
                    console.log("Resultado da atualização:", atualizado);
                    // 4. Testando Deletar Produto
                    console.log("\n4. Testando: deletarProduto para o ID ".concat(idProdutoMoc, "..."));
                    return [4 /*yield*/, deletarProduto(idProdutoMoc)];
                case 4:
                    deletado = _b.sent();
                    console.log("Foi deletado com sucesso?:", deletado);
                    return [3 /*break*/, 6];
                case 5:
                    console.log("\n[Aviso] Não foi possível testar Atualizar e Deletar porque nenhum ID foi gerado no INSERT.");
                    _b.label = 6;
                case 6:
                    console.log("\n--- FIM DOS TESTES ---");
                    return [3 /*break*/, 10];
                case 7:
                    erro_1 = _b.sent();
                    console.error("\n[ERRO] Ocorreu uma falha durante os testes:", erro_1);
                    return [3 /*break*/, 10];
                case 8: 
                // IMPORTANTE: Fecha a conexão com o banco para o terminal não travar
                return [4 /*yield*/, pool.end()];
                case 9:
                    // IMPORTANTE: Fecha a conexão com o banco para o terminal não travar
                    _b.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Linha obrigatória que faz o teste iniciar quando você chama o comando no terminal
rodarTodosOsTestes();
