import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};










export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  password: Scalars['String'];
  role?: Maybe<Role>;
  token?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  id: Scalars['ID'];
  from: Scalars['Date'];
  to: Scalars['Date'];
};

export type Apartment = {
  __typename?: 'Apartment';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  number_of_rooms: Scalars['Int'];
  time_slots?: Maybe<Array<Maybe<TimeSlot>>>;
  owner: User;
};

export type ApartmentInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  price: Scalars['Float'];
  number_of_rooms: Scalars['Int'];
  owner_id: Scalars['ID'];
};

export type VoucherType = {
  __typename?: 'VoucherType';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Voucher = {
  __typename?: 'Voucher';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  price: Scalars['Float'];
  variant: VoucherType;
  quantity: Scalars['Int'];
  owner: User;
};

export type VoucherInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  price: Scalars['Float'];
  variant: Scalars['ID'];
  quantity: Scalars['Int'];
  owner_id: Scalars['ID'];
};

export type SignUpInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type ApartmentResponse = {
  __typename?: 'ApartmentResponse';
  error?: Maybe<Error>;
  data?: Maybe<Apartment>;
};

export type VoucherResponse = {
  __typename?: 'VoucherResponse';
  error?: Maybe<Error>;
  data?: Maybe<Voucher>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Error>;
  data?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  roles?: Maybe<Array<Maybe<Role>>>;
  users?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
  voucherTypes?: Maybe<Array<Maybe<VoucherType>>>;
  apartments?: Maybe<Array<Maybe<Apartment>>>;
  apartment?: Maybe<Apartment>;
  vouchers?: Maybe<Array<Maybe<Voucher>>>;
  voucher?: Maybe<Voucher>;
};


export type QueryUserArgs = {
  email: Scalars['String'];
};


export type QueryApartmentArgs = {
  id: Scalars['ID'];
};


export type QueryVoucherArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: UserResponse;
  login: UserResponse;
  createApartment: ApartmentResponse;
  updateApartment: ApartmentResponse;
  deleteAparment: ApartmentResponse;
  createVoucher: VoucherResponse;
  updateVoucher: VoucherResponse;
  deleteVoucher: VoucherResponse;
};


export type MutationSignUpArgs = {
  data?: Maybe<SignUpInput>;
};


export type MutationLoginArgs = {
  data?: Maybe<LoginInput>;
};


export type MutationCreateApartmentArgs = {
  data?: Maybe<ApartmentInput>;
};


export type MutationUpdateApartmentArgs = {
  id: Scalars['ID'];
  data?: Maybe<ApartmentInput>;
};


export type MutationDeleteAparmentArgs = {
  id: Scalars['ID'];
};


export type MutationCreateVoucherArgs = {
  data?: Maybe<VoucherInput>;
};


export type MutationUpdateVoucherArgs = {
  id: Scalars['ID'];
  data?: Maybe<VoucherInput>;
};


export type MutationDeleteVoucherArgs = {
  id: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Role: ResolverTypeWrapper<Role>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  TimeSlot: ResolverTypeWrapper<TimeSlot>;
  Apartment: ResolverTypeWrapper<Apartment>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ApartmentInput: ApartmentInput;
  VoucherType: ResolverTypeWrapper<VoucherType>;
  Voucher: ResolverTypeWrapper<Voucher>;
  VoucherInput: VoucherInput;
  SignUpInput: SignUpInput;
  LoginInput: LoginInput;
  Error: ResolverTypeWrapper<Error>;
  ApartmentResponse: ResolverTypeWrapper<ApartmentResponse>;
  VoucherResponse: ResolverTypeWrapper<VoucherResponse>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Role: Role;
  ID: Scalars['ID'];
  String: Scalars['String'];
  User: User;
  TimeSlot: TimeSlot;
  Apartment: Apartment;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  ApartmentInput: ApartmentInput;
  VoucherType: VoucherType;
  Voucher: Voucher;
  VoucherInput: VoucherInput;
  SignUpInput: SignUpInput;
  LoginInput: LoginInput;
  Error: Error;
  ApartmentResponse: ApartmentResponse;
  VoucherResponse: VoucherResponse;
  UserResponse: UserResponse;
  Query: {};
  Mutation: {};
  Upload: Scalars['Upload'];
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TimeSlotResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeSlot'] = ResolversParentTypes['TimeSlot']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ApartmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Apartment'] = ResolversParentTypes['Apartment']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  number_of_rooms?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time_slots?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimeSlot']>>>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VoucherTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherType'] = ResolversParentTypes['VoucherType']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VoucherResolvers<ContextType = any, ParentType extends ResolversParentTypes['Voucher'] = ResolversParentTypes['Voucher']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  variant?: Resolver<ResolversTypes['VoucherType'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ApartmentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApartmentResponse'] = ResolversParentTypes['ApartmentResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Apartment']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VoucherResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VoucherResponse'] = ResolversParentTypes['VoucherResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['Voucher']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['Error']>, ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'email'>>;
  voucherTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['VoucherType']>>>, ParentType, ContextType>;
  apartments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Apartment']>>>, ParentType, ContextType>;
  apartment?: Resolver<Maybe<ResolversTypes['Apartment']>, ParentType, ContextType, RequireFields<QueryApartmentArgs, 'id'>>;
  vouchers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Voucher']>>>, ParentType, ContextType>;
  voucher?: Resolver<Maybe<ResolversTypes['Voucher']>, ParentType, ContextType, RequireFields<QueryVoucherArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signUp?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationSignUpArgs, never>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  createApartment?: Resolver<ResolversTypes['ApartmentResponse'], ParentType, ContextType, RequireFields<MutationCreateApartmentArgs, never>>;
  updateApartment?: Resolver<ResolversTypes['ApartmentResponse'], ParentType, ContextType, RequireFields<MutationUpdateApartmentArgs, 'id'>>;
  deleteAparment?: Resolver<ResolversTypes['ApartmentResponse'], ParentType, ContextType, RequireFields<MutationDeleteAparmentArgs, 'id'>>;
  createVoucher?: Resolver<ResolversTypes['VoucherResponse'], ParentType, ContextType, RequireFields<MutationCreateVoucherArgs, never>>;
  updateVoucher?: Resolver<ResolversTypes['VoucherResponse'], ParentType, ContextType, RequireFields<MutationUpdateVoucherArgs, 'id'>>;
  deleteVoucher?: Resolver<ResolversTypes['VoucherResponse'], ParentType, ContextType, RequireFields<MutationDeleteVoucherArgs, 'id'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Role?: RoleResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  TimeSlot?: TimeSlotResolvers<ContextType>;
  Apartment?: ApartmentResolvers<ContextType>;
  VoucherType?: VoucherTypeResolvers<ContextType>;
  Voucher?: VoucherResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  ApartmentResponse?: ApartmentResponseResolvers<ContextType>;
  VoucherResponse?: VoucherResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';