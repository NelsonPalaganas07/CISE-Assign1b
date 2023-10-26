"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const suggest_schema_1 = require("./schemas/suggest.schema");
const mongoose_2 = require("mongoose");
const published_schema_1 = require("./schemas/published.schema");
const moderated_schema_1 = require("./schemas/moderated.schema");
let ArticleService = class ArticleService {
    constructor(publishedArticleModel, articleModel, moderatedArticleModel) {
        this.publishedArticleModel = publishedArticleModel;
        this.articleModel = articleModel;
        this.moderatedArticleModel = moderatedArticleModel;
    }
    publishArticle(articleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('PUBLISH ARTICLE CALLED');
            const { title, authors, source, pubyear, doi, claim, evidence, research, SEPractise, participant, } = articleDto;
            try {
                const publishedArticle = yield this.publishedArticleModel.create({
                    title,
                    authors,
                    source,
                    pubyear,
                    doi,
                    claim,
                    evidence,
                    research,
                    SEPractise,
                    participant,
                });
                console.log('PUBLISHED ARTICLE');
                console.log(publishedArticle);
                return publishedArticle;
            }
            catch (error) {
                console.error('Error Publishing Article:', error);
                throw new common_1.HttpException('Unable to Publish Article', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    createArticle(articleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('CREATE ARTICLE CALLED');
            const { customId, title, authors, source, pubyear, doi, participant } = articleDto;
            try {
                const count = yield this.articleModel.countDocuments();
                const customId = count + 1;
                const article = yield this.articleModel.create({
                    customId,
                    title,
                    authors,
                    source,
                    pubyear,
                    doi,
                    participant,
                });
                console.log(article);
                return article;
            }
            catch (error) {
                console.error('Error creating article:', error);
                throw new common_1.HttpException('Unable to create article', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    confirmModeration(articleDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('CONFIRM ARTICLE MODERATION CALLED');
            const { customId, title, authors, source, pubyear, doi, decision, participant } = articleDto;
            console.log('ARTICLE DTO');
            console.log(articleDto);
            try {
                const moderatedArticle = yield this.moderatedArticleModel.create({
                    customId,
                    title,
                    authors,
                    source,
                    pubyear,
                    doi,
                    decision,
                    participant,
                });
                console.log('MODERATED ARTICLE');
                console.log(moderatedArticle);
                return moderatedArticle;
            }
            catch (error) {
                console.error('Error Publishing Article:', error);
                throw new common_1.HttpException('Unable to Publish Article', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    findAllSuggested() {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield this.articleModel.find();
            return articles;
        });
    }
    findAllModerated() {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield this.moderatedArticleModel.find();
            return articles;
        });
    }
    findPublishedArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield this.publishedArticleModel.find();
            return articles;
        });
    }
    findModeratedByCustomId(customId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield this.moderatedArticleModel.findOneAndDelete({
                    customId,
                });
                if (article) {
                    return article;
                }
                else {
                    console.log('Did not find any article.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error finding moderated article by customId:', error);
                throw new common_1.HttpException('Unable to find moderated article', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    findSuggestedByCustomId(customId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const article = yield this.articleModel.findOneAndDelete({
                    customId,
                });
                if (article) {
                    return article;
                }
                else {
                    console.log('Did not find any article.');
                    return null;
                }
            }
            catch (error) {
                console.error('Error finding suggested article by customId:', error);
                throw new common_1.HttpException('Unable to find suggested article', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(published_schema_1.PublishedArticles.name)),
    __param(1, (0, mongoose_1.InjectModel)(suggest_schema_1.SuggestedArticles.name)),
    __param(2, (0, mongoose_1.InjectModel)(moderated_schema_1.ModeratedArticles.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ArticleService);
//# sourceMappingURL=article.service.js.map