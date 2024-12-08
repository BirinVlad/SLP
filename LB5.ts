
interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
  }
  
  
  interface Article extends BaseContent {
    title: string;
    content: string;
    authorId: string;
  }
  
  
  interface Product extends BaseContent {
    name: string;
    price: number;
    description: string;
    categoryId: string;
  }
  
 
  type ContentOperations<T extends BaseContent> = {
    create: (content: T) => void;
    read: (id: string) => T | null;
    update: (id: string, content: T) => void;
    delete: (id: string) => void;
  }
  
  
  type Role = 'admin' | 'editor' | 'viewer';
  
  type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  }
  
  
  type AccessControl<T extends BaseContent> = {
    role: Role;
    permissions: Permission;
    canAccess: (content: T, action: keyof Permission) => boolean;
  }
  
  
  const canAccessContent = <T extends BaseContent>(accessControl: AccessControl<T>, content: T, action: keyof Permission): boolean => {
    return accessControl.permissions[action];
  }
  
  
  type Validator<T> = {
    validate: (data: T) => ValidationResult;
  }
  
  type ValidationResult = {
    isValid: boolean;
    errors?: string[];
  }
  
  
  class ArticleValidator implements Validator<Article> {
    validate(data: Article): ValidationResult {
      const errors: string[] = [];
      if (!data.title) errors.push("Title is required");
      if (!data.content) errors.push("Content is required");
      return {
        isValid: errors.length === 0,
        errors: errors.length ? errors : undefined,
      };
    }
  }
  
  
  class CompositeValidator<T> implements Validator<T> {
    private validators: Validator<T>[];
  
    constructor(validators: Validator<T>[]) {
      this.validators = validators;
    }
  
    validate(data: T): ValidationResult {
      const results = this.validators.map(validator => validator.validate(data));
      const errors = results.flatMap(result => result.errors || []);
      return {
        isValid: errors.length === 0,
        errors: errors.length ? errors : undefined,
      };
    }
  }
  
  
  type Versioned<T extends BaseContent> = T & {
    version: number;
    history: T[];
  }
  
  
  class VersionedArticle implements Versioned<Article> {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
    title: string;
    content: string;
    authorId: string;
    version: number;
    history: Article[];
  
    constructor(article: Article) {
      this.id = article.id;
      this.createdAt = article.createdAt;
      this.updatedAt = article.updatedAt;
      this.publishedAt = article.publishedAt;
      this.status = article.status;
      this.title = article.title;
      this.content = article.content;
      this.authorId = article.authorId;
      this.version = 1;
      this.history = [];
    }
  
    update(newContent: Article) {
      this.history.push({ ...this });
      this.title = newContent.title;
      this.content = newContent.content;
      this.updatedAt = new Date();
      this.version++;
    }
  }
  