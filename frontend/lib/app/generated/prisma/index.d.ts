
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Camera
 * 
 */
export type Camera = $Result.DefaultSelection<Prisma.$CameraPayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Location: {
  wallside: 'wallside',
  normal: 'normal'
};

export type Location = (typeof Location)[keyof typeof Location]


export const CameraType: {
  camera: 'camera',
  link: 'link'
};

export type CameraType = (typeof CameraType)[keyof typeof CameraType]


export const CameraStatus: {
  active: 'active',
  inactive: 'inactive'
};

export type CameraStatus = (typeof CameraStatus)[keyof typeof CameraStatus]


export const AlertType: {
  HEIGHT: 'HEIGHT',
  COUNT: 'COUNT'
};

export type AlertType = (typeof AlertType)[keyof typeof AlertType]


export const AlertStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Location = $Enums.Location

export const Location: typeof $Enums.Location

export type CameraType = $Enums.CameraType

export const CameraType: typeof $Enums.CameraType

export type CameraStatus = $Enums.CameraStatus

export const CameraStatus: typeof $Enums.CameraStatus

export type AlertType = $Enums.AlertType

export const AlertType: typeof $Enums.AlertType

export type AlertStatus = $Enums.AlertStatus

export const AlertStatus: typeof $Enums.AlertStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.camera`: Exposes CRUD operations for the **Camera** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cameras
    * const cameras = await prisma.camera.findMany()
    * ```
    */
  get camera(): Prisma.CameraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Camera: 'Camera',
    Alert: 'Alert'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "camera" | "alert"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Camera: {
        payload: Prisma.$CameraPayload<ExtArgs>
        fields: Prisma.CameraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CameraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CameraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>
          }
          findFirst: {
            args: Prisma.CameraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CameraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>
          }
          findMany: {
            args: Prisma.CameraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>[]
          }
          create: {
            args: Prisma.CameraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>
          }
          createMany: {
            args: Prisma.CameraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CameraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>
          }
          update: {
            args: Prisma.CameraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>
          }
          deleteMany: {
            args: Prisma.CameraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CameraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CameraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CameraPayload>
          }
          aggregate: {
            args: Prisma.CameraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCamera>
          }
          groupBy: {
            args: Prisma.CameraGroupByArgs<ExtArgs>
            result: $Utils.Optional<CameraGroupByOutputType>[]
          }
          count: {
            args: Prisma.CameraCountArgs<ExtArgs>
            result: $Utils.Optional<CameraCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    camera?: CameraOmit
    alert?: AlertOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ownedCameras: number
    createdCameras: number
    updatedCameras: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedCameras?: boolean | UserCountOutputTypeCountOwnedCamerasArgs
    createdCameras?: boolean | UserCountOutputTypeCountCreatedCamerasArgs
    updatedCameras?: boolean | UserCountOutputTypeCountUpdatedCamerasArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedCamerasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CameraWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedCamerasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CameraWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUpdatedCamerasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CameraWhereInput
  }


  /**
   * Count Type CameraCountOutputType
   */

  export type CameraCountOutputType = {
    Alert: number
  }

  export type CameraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Alert?: boolean | CameraCountOutputTypeCountAlertArgs
  }

  // Custom InputTypes
  /**
   * CameraCountOutputType without action
   */
  export type CameraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CameraCountOutputType
     */
    select?: CameraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CameraCountOutputType without action
   */
  export type CameraCountOutputTypeCountAlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownedCameras?: boolean | User$ownedCamerasArgs<ExtArgs>
    createdCameras?: boolean | User$createdCamerasArgs<ExtArgs>
    updatedCameras?: boolean | User$updatedCamerasArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedCameras?: boolean | User$ownedCamerasArgs<ExtArgs>
    createdCameras?: boolean | User$createdCamerasArgs<ExtArgs>
    updatedCameras?: boolean | User$updatedCamerasArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ownedCameras: Prisma.$CameraPayload<ExtArgs>[]
      createdCameras: Prisma.$CameraPayload<ExtArgs>[]
      updatedCameras: Prisma.$CameraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ownedCameras<T extends User$ownedCamerasArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedCamerasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdCameras<T extends User$createdCamerasArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCamerasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updatedCameras<T extends User$updatedCamerasArgs<ExtArgs> = {}>(args?: Subset<T, User$updatedCamerasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ownedCameras
   */
  export type User$ownedCamerasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    where?: CameraWhereInput
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    cursor?: CameraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CameraScalarFieldEnum | CameraScalarFieldEnum[]
  }

  /**
   * User.createdCameras
   */
  export type User$createdCamerasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    where?: CameraWhereInput
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    cursor?: CameraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CameraScalarFieldEnum | CameraScalarFieldEnum[]
  }

  /**
   * User.updatedCameras
   */
  export type User$updatedCamerasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    where?: CameraWhereInput
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    cursor?: CameraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CameraScalarFieldEnum | CameraScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Camera
   */

  export type AggregateCamera = {
    _count: CameraCountAggregateOutputType | null
    _avg: CameraAvgAggregateOutputType | null
    _sum: CameraSumAggregateOutputType | null
    _min: CameraMinAggregateOutputType | null
    _max: CameraMaxAggregateOutputType | null
  }

  export type CameraAvgAggregateOutputType = {
    id: number | null
    port: number | null
    userId: number | null
    createdById: number | null
    updatedById: number | null
    heightThreshold: number | null
    alertThreshold: number | null
  }

  export type CameraSumAggregateOutputType = {
    id: number | null
    port: number | null
    userId: number | null
    createdById: number | null
    updatedById: number | null
    heightThreshold: number | null
    alertThreshold: number | null
  }

  export type CameraMinAggregateOutputType = {
    id: number | null
    name: string | null
    location: $Enums.Location | null
    ipAddress: string | null
    port: number | null
    type: $Enums.CameraType | null
    protocol: string | null
    status: $Enums.CameraStatus | null
    userId: number | null
    createdById: number | null
    updatedById: number | null
    heightThreshold: number | null
    alertThreshold: number | null
    cameraUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CameraMaxAggregateOutputType = {
    id: number | null
    name: string | null
    location: $Enums.Location | null
    ipAddress: string | null
    port: number | null
    type: $Enums.CameraType | null
    protocol: string | null
    status: $Enums.CameraStatus | null
    userId: number | null
    createdById: number | null
    updatedById: number | null
    heightThreshold: number | null
    alertThreshold: number | null
    cameraUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CameraCountAggregateOutputType = {
    id: number
    name: number
    location: number
    ipAddress: number
    port: number
    type: number
    protocol: number
    status: number
    userId: number
    createdById: number
    updatedById: number
    heightThreshold: number
    alertThreshold: number
    cameraUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CameraAvgAggregateInputType = {
    id?: true
    port?: true
    userId?: true
    createdById?: true
    updatedById?: true
    heightThreshold?: true
    alertThreshold?: true
  }

  export type CameraSumAggregateInputType = {
    id?: true
    port?: true
    userId?: true
    createdById?: true
    updatedById?: true
    heightThreshold?: true
    alertThreshold?: true
  }

  export type CameraMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    ipAddress?: true
    port?: true
    type?: true
    protocol?: true
    status?: true
    userId?: true
    createdById?: true
    updatedById?: true
    heightThreshold?: true
    alertThreshold?: true
    cameraUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CameraMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    ipAddress?: true
    port?: true
    type?: true
    protocol?: true
    status?: true
    userId?: true
    createdById?: true
    updatedById?: true
    heightThreshold?: true
    alertThreshold?: true
    cameraUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CameraCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    ipAddress?: true
    port?: true
    type?: true
    protocol?: true
    status?: true
    userId?: true
    createdById?: true
    updatedById?: true
    heightThreshold?: true
    alertThreshold?: true
    cameraUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CameraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Camera to aggregate.
     */
    where?: CameraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cameras to fetch.
     */
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CameraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cameras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cameras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cameras
    **/
    _count?: true | CameraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CameraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CameraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CameraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CameraMaxAggregateInputType
  }

  export type GetCameraAggregateType<T extends CameraAggregateArgs> = {
        [P in keyof T & keyof AggregateCamera]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCamera[P]>
      : GetScalarType<T[P], AggregateCamera[P]>
  }




  export type CameraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CameraWhereInput
    orderBy?: CameraOrderByWithAggregationInput | CameraOrderByWithAggregationInput[]
    by: CameraScalarFieldEnum[] | CameraScalarFieldEnum
    having?: CameraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CameraCountAggregateInputType | true
    _avg?: CameraAvgAggregateInputType
    _sum?: CameraSumAggregateInputType
    _min?: CameraMinAggregateInputType
    _max?: CameraMaxAggregateInputType
  }

  export type CameraGroupByOutputType = {
    id: number
    name: string
    location: $Enums.Location
    ipAddress: string | null
    port: number | null
    type: $Enums.CameraType
    protocol: string | null
    status: $Enums.CameraStatus
    userId: number
    createdById: number
    updatedById: number
    heightThreshold: number | null
    alertThreshold: number
    cameraUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: CameraCountAggregateOutputType | null
    _avg: CameraAvgAggregateOutputType | null
    _sum: CameraSumAggregateOutputType | null
    _min: CameraMinAggregateOutputType | null
    _max: CameraMaxAggregateOutputType | null
  }

  type GetCameraGroupByPayload<T extends CameraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CameraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CameraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CameraGroupByOutputType[P]>
            : GetScalarType<T[P], CameraGroupByOutputType[P]>
        }
      >
    >


  export type CameraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    ipAddress?: boolean
    port?: boolean
    type?: boolean
    protocol?: boolean
    status?: boolean
    userId?: boolean
    createdById?: boolean
    updatedById?: boolean
    heightThreshold?: boolean
    alertThreshold?: boolean
    cameraUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
    Alert?: boolean | Camera$AlertArgs<ExtArgs>
    _count?: boolean | CameraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["camera"]>



  export type CameraSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    ipAddress?: boolean
    port?: boolean
    type?: boolean
    protocol?: boolean
    status?: boolean
    userId?: boolean
    createdById?: boolean
    updatedById?: boolean
    heightThreshold?: boolean
    alertThreshold?: boolean
    cameraUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CameraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "ipAddress" | "port" | "type" | "protocol" | "status" | "userId" | "createdById" | "updatedById" | "heightThreshold" | "alertThreshold" | "cameraUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["camera"]>
  export type CameraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | UserDefaultArgs<ExtArgs>
    Alert?: boolean | Camera$AlertArgs<ExtArgs>
    _count?: boolean | CameraCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CameraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Camera"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
      updatedBy: Prisma.$UserPayload<ExtArgs>
      Alert: Prisma.$AlertPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      location: $Enums.Location
      ipAddress: string | null
      port: number | null
      type: $Enums.CameraType
      protocol: string | null
      status: $Enums.CameraStatus
      userId: number
      createdById: number
      updatedById: number
      heightThreshold: number | null
      alertThreshold: number
      cameraUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["camera"]>
    composites: {}
  }

  type CameraGetPayload<S extends boolean | null | undefined | CameraDefaultArgs> = $Result.GetResult<Prisma.$CameraPayload, S>

  type CameraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CameraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CameraCountAggregateInputType | true
    }

  export interface CameraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Camera'], meta: { name: 'Camera' } }
    /**
     * Find zero or one Camera that matches the filter.
     * @param {CameraFindUniqueArgs} args - Arguments to find a Camera
     * @example
     * // Get one Camera
     * const camera = await prisma.camera.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CameraFindUniqueArgs>(args: SelectSubset<T, CameraFindUniqueArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Camera that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CameraFindUniqueOrThrowArgs} args - Arguments to find a Camera
     * @example
     * // Get one Camera
     * const camera = await prisma.camera.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CameraFindUniqueOrThrowArgs>(args: SelectSubset<T, CameraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Camera that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraFindFirstArgs} args - Arguments to find a Camera
     * @example
     * // Get one Camera
     * const camera = await prisma.camera.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CameraFindFirstArgs>(args?: SelectSubset<T, CameraFindFirstArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Camera that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraFindFirstOrThrowArgs} args - Arguments to find a Camera
     * @example
     * // Get one Camera
     * const camera = await prisma.camera.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CameraFindFirstOrThrowArgs>(args?: SelectSubset<T, CameraFindFirstOrThrowArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cameras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cameras
     * const cameras = await prisma.camera.findMany()
     * 
     * // Get first 10 Cameras
     * const cameras = await prisma.camera.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cameraWithIdOnly = await prisma.camera.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CameraFindManyArgs>(args?: SelectSubset<T, CameraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Camera.
     * @param {CameraCreateArgs} args - Arguments to create a Camera.
     * @example
     * // Create one Camera
     * const Camera = await prisma.camera.create({
     *   data: {
     *     // ... data to create a Camera
     *   }
     * })
     * 
     */
    create<T extends CameraCreateArgs>(args: SelectSubset<T, CameraCreateArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cameras.
     * @param {CameraCreateManyArgs} args - Arguments to create many Cameras.
     * @example
     * // Create many Cameras
     * const camera = await prisma.camera.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CameraCreateManyArgs>(args?: SelectSubset<T, CameraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Camera.
     * @param {CameraDeleteArgs} args - Arguments to delete one Camera.
     * @example
     * // Delete one Camera
     * const Camera = await prisma.camera.delete({
     *   where: {
     *     // ... filter to delete one Camera
     *   }
     * })
     * 
     */
    delete<T extends CameraDeleteArgs>(args: SelectSubset<T, CameraDeleteArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Camera.
     * @param {CameraUpdateArgs} args - Arguments to update one Camera.
     * @example
     * // Update one Camera
     * const camera = await prisma.camera.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CameraUpdateArgs>(args: SelectSubset<T, CameraUpdateArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cameras.
     * @param {CameraDeleteManyArgs} args - Arguments to filter Cameras to delete.
     * @example
     * // Delete a few Cameras
     * const { count } = await prisma.camera.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CameraDeleteManyArgs>(args?: SelectSubset<T, CameraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cameras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cameras
     * const camera = await prisma.camera.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CameraUpdateManyArgs>(args: SelectSubset<T, CameraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Camera.
     * @param {CameraUpsertArgs} args - Arguments to update or create a Camera.
     * @example
     * // Update or create a Camera
     * const camera = await prisma.camera.upsert({
     *   create: {
     *     // ... data to create a Camera
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Camera we want to update
     *   }
     * })
     */
    upsert<T extends CameraUpsertArgs>(args: SelectSubset<T, CameraUpsertArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cameras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraCountArgs} args - Arguments to filter Cameras to count.
     * @example
     * // Count the number of Cameras
     * const count = await prisma.camera.count({
     *   where: {
     *     // ... the filter for the Cameras we want to count
     *   }
     * })
    **/
    count<T extends CameraCountArgs>(
      args?: Subset<T, CameraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CameraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Camera.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CameraAggregateArgs>(args: Subset<T, CameraAggregateArgs>): Prisma.PrismaPromise<GetCameraAggregateType<T>>

    /**
     * Group by Camera.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CameraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CameraGroupByArgs['orderBy'] }
        : { orderBy?: CameraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CameraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCameraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Camera model
   */
  readonly fields: CameraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Camera.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CameraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Alert<T extends Camera$AlertArgs<ExtArgs> = {}>(args?: Subset<T, Camera$AlertArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Camera model
   */
  interface CameraFieldRefs {
    readonly id: FieldRef<"Camera", 'Int'>
    readonly name: FieldRef<"Camera", 'String'>
    readonly location: FieldRef<"Camera", 'Location'>
    readonly ipAddress: FieldRef<"Camera", 'String'>
    readonly port: FieldRef<"Camera", 'Int'>
    readonly type: FieldRef<"Camera", 'CameraType'>
    readonly protocol: FieldRef<"Camera", 'String'>
    readonly status: FieldRef<"Camera", 'CameraStatus'>
    readonly userId: FieldRef<"Camera", 'Int'>
    readonly createdById: FieldRef<"Camera", 'Int'>
    readonly updatedById: FieldRef<"Camera", 'Int'>
    readonly heightThreshold: FieldRef<"Camera", 'Float'>
    readonly alertThreshold: FieldRef<"Camera", 'Float'>
    readonly cameraUrl: FieldRef<"Camera", 'String'>
    readonly createdAt: FieldRef<"Camera", 'DateTime'>
    readonly updatedAt: FieldRef<"Camera", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Camera findUnique
   */
  export type CameraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * Filter, which Camera to fetch.
     */
    where: CameraWhereUniqueInput
  }

  /**
   * Camera findUniqueOrThrow
   */
  export type CameraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * Filter, which Camera to fetch.
     */
    where: CameraWhereUniqueInput
  }

  /**
   * Camera findFirst
   */
  export type CameraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * Filter, which Camera to fetch.
     */
    where?: CameraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cameras to fetch.
     */
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cameras.
     */
    cursor?: CameraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cameras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cameras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cameras.
     */
    distinct?: CameraScalarFieldEnum | CameraScalarFieldEnum[]
  }

  /**
   * Camera findFirstOrThrow
   */
  export type CameraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * Filter, which Camera to fetch.
     */
    where?: CameraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cameras to fetch.
     */
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cameras.
     */
    cursor?: CameraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cameras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cameras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cameras.
     */
    distinct?: CameraScalarFieldEnum | CameraScalarFieldEnum[]
  }

  /**
   * Camera findMany
   */
  export type CameraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * Filter, which Cameras to fetch.
     */
    where?: CameraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cameras to fetch.
     */
    orderBy?: CameraOrderByWithRelationInput | CameraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cameras.
     */
    cursor?: CameraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cameras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cameras.
     */
    skip?: number
    distinct?: CameraScalarFieldEnum | CameraScalarFieldEnum[]
  }

  /**
   * Camera create
   */
  export type CameraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * The data needed to create a Camera.
     */
    data: XOR<CameraCreateInput, CameraUncheckedCreateInput>
  }

  /**
   * Camera createMany
   */
  export type CameraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cameras.
     */
    data: CameraCreateManyInput | CameraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Camera update
   */
  export type CameraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * The data needed to update a Camera.
     */
    data: XOR<CameraUpdateInput, CameraUncheckedUpdateInput>
    /**
     * Choose, which Camera to update.
     */
    where: CameraWhereUniqueInput
  }

  /**
   * Camera updateMany
   */
  export type CameraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cameras.
     */
    data: XOR<CameraUpdateManyMutationInput, CameraUncheckedUpdateManyInput>
    /**
     * Filter which Cameras to update
     */
    where?: CameraWhereInput
    /**
     * Limit how many Cameras to update.
     */
    limit?: number
  }

  /**
   * Camera upsert
   */
  export type CameraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * The filter to search for the Camera to update in case it exists.
     */
    where: CameraWhereUniqueInput
    /**
     * In case the Camera found by the `where` argument doesn't exist, create a new Camera with this data.
     */
    create: XOR<CameraCreateInput, CameraUncheckedCreateInput>
    /**
     * In case the Camera was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CameraUpdateInput, CameraUncheckedUpdateInput>
  }

  /**
   * Camera delete
   */
  export type CameraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
    /**
     * Filter which Camera to delete.
     */
    where: CameraWhereUniqueInput
  }

  /**
   * Camera deleteMany
   */
  export type CameraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cameras to delete
     */
    where?: CameraWhereInput
    /**
     * Limit how many Cameras to delete.
     */
    limit?: number
  }

  /**
   * Camera.Alert
   */
  export type Camera$AlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Camera without action
   */
  export type CameraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Camera
     */
    select?: CameraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Camera
     */
    omit?: CameraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CameraInclude<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertAvgAggregateOutputType = {
    id: number | null
    cameraId: number | null
    noOfPeople: number | null
  }

  export type AlertSumAggregateOutputType = {
    id: number | null
    cameraId: number | null
    noOfPeople: number | null
  }

  export type AlertMinAggregateOutputType = {
    id: number | null
    cameraId: number | null
    type: $Enums.AlertType | null
    noOfPeople: number | null
    url: string | null
    createdAt: Date | null
    isVisited: boolean | null
    status: $Enums.AlertStatus | null
    isNotificationSent: boolean | null
    notificationSentAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: number | null
    cameraId: number | null
    type: $Enums.AlertType | null
    noOfPeople: number | null
    url: string | null
    createdAt: Date | null
    isVisited: boolean | null
    status: $Enums.AlertStatus | null
    isNotificationSent: boolean | null
    notificationSentAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    cameraId: number
    type: number
    noOfPeople: number
    url: number
    createdAt: number
    isVisited: number
    status: number
    isNotificationSent: number
    notificationSentAt: number
    _all: number
  }


  export type AlertAvgAggregateInputType = {
    id?: true
    cameraId?: true
    noOfPeople?: true
  }

  export type AlertSumAggregateInputType = {
    id?: true
    cameraId?: true
    noOfPeople?: true
  }

  export type AlertMinAggregateInputType = {
    id?: true
    cameraId?: true
    type?: true
    noOfPeople?: true
    url?: true
    createdAt?: true
    isVisited?: true
    status?: true
    isNotificationSent?: true
    notificationSentAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    cameraId?: true
    type?: true
    noOfPeople?: true
    url?: true
    createdAt?: true
    isVisited?: true
    status?: true
    isNotificationSent?: true
    notificationSentAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    cameraId?: true
    type?: true
    noOfPeople?: true
    url?: true
    createdAt?: true
    isVisited?: true
    status?: true
    isNotificationSent?: true
    notificationSentAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _avg?: AlertAvgAggregateInputType
    _sum?: AlertSumAggregateInputType
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: number
    cameraId: number
    type: $Enums.AlertType
    noOfPeople: number
    url: string | null
    createdAt: Date
    isVisited: boolean | null
    status: $Enums.AlertStatus
    isNotificationSent: boolean
    notificationSentAt: Date | null
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cameraId?: boolean
    type?: boolean
    noOfPeople?: boolean
    url?: boolean
    createdAt?: boolean
    isVisited?: boolean
    status?: boolean
    isNotificationSent?: boolean
    notificationSentAt?: boolean
    camera?: boolean | CameraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>



  export type AlertSelectScalar = {
    id?: boolean
    cameraId?: boolean
    type?: boolean
    noOfPeople?: boolean
    url?: boolean
    createdAt?: boolean
    isVisited?: boolean
    status?: boolean
    isNotificationSent?: boolean
    notificationSentAt?: boolean
  }

  export type AlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cameraId" | "type" | "noOfPeople" | "url" | "createdAt" | "isVisited" | "status" | "isNotificationSent" | "notificationSentAt", ExtArgs["result"]["alert"]>
  export type AlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    camera?: boolean | CameraDefaultArgs<ExtArgs>
  }

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {
      camera: Prisma.$CameraPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cameraId: number
      type: $Enums.AlertType
      noOfPeople: number
      url: string | null
      createdAt: Date
      isVisited: boolean | null
      status: $Enums.AlertStatus
      isNotificationSent: boolean
      notificationSentAt: Date | null
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    camera<T extends CameraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CameraDefaultArgs<ExtArgs>>): Prisma__CameraClient<$Result.GetResult<Prisma.$CameraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'Int'>
    readonly cameraId: FieldRef<"Alert", 'Int'>
    readonly type: FieldRef<"Alert", 'AlertType'>
    readonly noOfPeople: FieldRef<"Alert", 'Int'>
    readonly url: FieldRef<"Alert", 'String'>
    readonly createdAt: FieldRef<"Alert", 'DateTime'>
    readonly isVisited: FieldRef<"Alert", 'Boolean'>
    readonly status: FieldRef<"Alert", 'AlertStatus'>
    readonly isNotificationSent: FieldRef<"Alert", 'Boolean'>
    readonly notificationSentAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to update.
     */
    limit?: number
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
    /**
     * Limit how many Alerts to delete.
     */
    limit?: number
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alert
     */
    omit?: AlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CameraScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    ipAddress: 'ipAddress',
    port: 'port',
    type: 'type',
    protocol: 'protocol',
    status: 'status',
    userId: 'userId',
    createdById: 'createdById',
    updatedById: 'updatedById',
    heightThreshold: 'heightThreshold',
    alertThreshold: 'alertThreshold',
    cameraUrl: 'cameraUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CameraScalarFieldEnum = (typeof CameraScalarFieldEnum)[keyof typeof CameraScalarFieldEnum]


  export const AlertScalarFieldEnum: {
    id: 'id',
    cameraId: 'cameraId',
    type: 'type',
    noOfPeople: 'noOfPeople',
    url: 'url',
    createdAt: 'createdAt',
    isVisited: 'isVisited',
    status: 'status',
    isNotificationSent: 'isNotificationSent',
    notificationSentAt: 'notificationSentAt'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const CameraOrderByRelevanceFieldEnum: {
    name: 'name',
    ipAddress: 'ipAddress',
    protocol: 'protocol',
    cameraUrl: 'cameraUrl'
  };

  export type CameraOrderByRelevanceFieldEnum = (typeof CameraOrderByRelevanceFieldEnum)[keyof typeof CameraOrderByRelevanceFieldEnum]


  export const AlertOrderByRelevanceFieldEnum: {
    url: 'url'
  };

  export type AlertOrderByRelevanceFieldEnum = (typeof AlertOrderByRelevanceFieldEnum)[keyof typeof AlertOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Location'
   */
  export type EnumLocationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Location'>
    


  /**
   * Reference to a field of type 'CameraType'
   */
  export type EnumCameraTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CameraType'>
    


  /**
   * Reference to a field of type 'CameraStatus'
   */
  export type EnumCameraStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CameraStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'AlertType'
   */
  export type EnumAlertTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AlertStatus'
   */
  export type EnumAlertStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertStatus'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ownedCameras?: CameraListRelationFilter
    createdCameras?: CameraListRelationFilter
    updatedCameras?: CameraListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownedCameras?: CameraOrderByRelationAggregateInput
    createdCameras?: CameraOrderByRelationAggregateInput
    updatedCameras?: CameraOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ownedCameras?: CameraListRelationFilter
    createdCameras?: CameraListRelationFilter
    updatedCameras?: CameraListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CameraWhereInput = {
    AND?: CameraWhereInput | CameraWhereInput[]
    OR?: CameraWhereInput[]
    NOT?: CameraWhereInput | CameraWhereInput[]
    id?: IntFilter<"Camera"> | number
    name?: StringFilter<"Camera"> | string
    location?: EnumLocationFilter<"Camera"> | $Enums.Location
    ipAddress?: StringNullableFilter<"Camera"> | string | null
    port?: IntNullableFilter<"Camera"> | number | null
    type?: EnumCameraTypeFilter<"Camera"> | $Enums.CameraType
    protocol?: StringNullableFilter<"Camera"> | string | null
    status?: EnumCameraStatusFilter<"Camera"> | $Enums.CameraStatus
    userId?: IntFilter<"Camera"> | number
    createdById?: IntFilter<"Camera"> | number
    updatedById?: IntFilter<"Camera"> | number
    heightThreshold?: FloatNullableFilter<"Camera"> | number | null
    alertThreshold?: FloatFilter<"Camera"> | number
    cameraUrl?: StringNullableFilter<"Camera"> | string | null
    createdAt?: DateTimeFilter<"Camera"> | Date | string
    updatedAt?: DateTimeFilter<"Camera"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    Alert?: AlertListRelationFilter
  }

  export type CameraOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    port?: SortOrderInput | SortOrder
    type?: SortOrder
    protocol?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrderInput | SortOrder
    alertThreshold?: SortOrder
    cameraUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    Alert?: AlertOrderByRelationAggregateInput
    _relevance?: CameraOrderByRelevanceInput
  }

  export type CameraWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CameraWhereInput | CameraWhereInput[]
    OR?: CameraWhereInput[]
    NOT?: CameraWhereInput | CameraWhereInput[]
    name?: StringFilter<"Camera"> | string
    location?: EnumLocationFilter<"Camera"> | $Enums.Location
    ipAddress?: StringNullableFilter<"Camera"> | string | null
    port?: IntNullableFilter<"Camera"> | number | null
    type?: EnumCameraTypeFilter<"Camera"> | $Enums.CameraType
    protocol?: StringNullableFilter<"Camera"> | string | null
    status?: EnumCameraStatusFilter<"Camera"> | $Enums.CameraStatus
    userId?: IntFilter<"Camera"> | number
    createdById?: IntFilter<"Camera"> | number
    updatedById?: IntFilter<"Camera"> | number
    heightThreshold?: FloatNullableFilter<"Camera"> | number | null
    alertThreshold?: FloatFilter<"Camera"> | number
    cameraUrl?: StringNullableFilter<"Camera"> | string | null
    createdAt?: DateTimeFilter<"Camera"> | Date | string
    updatedAt?: DateTimeFilter<"Camera"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    Alert?: AlertListRelationFilter
  }, "id">

  export type CameraOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    port?: SortOrderInput | SortOrder
    type?: SortOrder
    protocol?: SortOrderInput | SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrderInput | SortOrder
    alertThreshold?: SortOrder
    cameraUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CameraCountOrderByAggregateInput
    _avg?: CameraAvgOrderByAggregateInput
    _max?: CameraMaxOrderByAggregateInput
    _min?: CameraMinOrderByAggregateInput
    _sum?: CameraSumOrderByAggregateInput
  }

  export type CameraScalarWhereWithAggregatesInput = {
    AND?: CameraScalarWhereWithAggregatesInput | CameraScalarWhereWithAggregatesInput[]
    OR?: CameraScalarWhereWithAggregatesInput[]
    NOT?: CameraScalarWhereWithAggregatesInput | CameraScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Camera"> | number
    name?: StringWithAggregatesFilter<"Camera"> | string
    location?: EnumLocationWithAggregatesFilter<"Camera"> | $Enums.Location
    ipAddress?: StringNullableWithAggregatesFilter<"Camera"> | string | null
    port?: IntNullableWithAggregatesFilter<"Camera"> | number | null
    type?: EnumCameraTypeWithAggregatesFilter<"Camera"> | $Enums.CameraType
    protocol?: StringNullableWithAggregatesFilter<"Camera"> | string | null
    status?: EnumCameraStatusWithAggregatesFilter<"Camera"> | $Enums.CameraStatus
    userId?: IntWithAggregatesFilter<"Camera"> | number
    createdById?: IntWithAggregatesFilter<"Camera"> | number
    updatedById?: IntWithAggregatesFilter<"Camera"> | number
    heightThreshold?: FloatNullableWithAggregatesFilter<"Camera"> | number | null
    alertThreshold?: FloatWithAggregatesFilter<"Camera"> | number
    cameraUrl?: StringNullableWithAggregatesFilter<"Camera"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Camera"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Camera"> | Date | string
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: IntFilter<"Alert"> | number
    cameraId?: IntFilter<"Alert"> | number
    type?: EnumAlertTypeFilter<"Alert"> | $Enums.AlertType
    noOfPeople?: IntFilter<"Alert"> | number
    url?: StringNullableFilter<"Alert"> | string | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    isVisited?: BoolNullableFilter<"Alert"> | boolean | null
    status?: EnumAlertStatusFilter<"Alert"> | $Enums.AlertStatus
    isNotificationSent?: BoolFilter<"Alert"> | boolean
    notificationSentAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    camera?: XOR<CameraScalarRelationFilter, CameraWhereInput>
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    cameraId?: SortOrder
    type?: SortOrder
    noOfPeople?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isVisited?: SortOrderInput | SortOrder
    status?: SortOrder
    isNotificationSent?: SortOrder
    notificationSentAt?: SortOrderInput | SortOrder
    camera?: CameraOrderByWithRelationInput
    _relevance?: AlertOrderByRelevanceInput
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    cameraId?: IntFilter<"Alert"> | number
    type?: EnumAlertTypeFilter<"Alert"> | $Enums.AlertType
    noOfPeople?: IntFilter<"Alert"> | number
    url?: StringNullableFilter<"Alert"> | string | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    isVisited?: BoolNullableFilter<"Alert"> | boolean | null
    status?: EnumAlertStatusFilter<"Alert"> | $Enums.AlertStatus
    isNotificationSent?: BoolFilter<"Alert"> | boolean
    notificationSentAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
    camera?: XOR<CameraScalarRelationFilter, CameraWhereInput>
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    cameraId?: SortOrder
    type?: SortOrder
    noOfPeople?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    isVisited?: SortOrderInput | SortOrder
    status?: SortOrder
    isNotificationSent?: SortOrder
    notificationSentAt?: SortOrderInput | SortOrder
    _count?: AlertCountOrderByAggregateInput
    _avg?: AlertAvgOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
    _sum?: AlertSumOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Alert"> | number
    cameraId?: IntWithAggregatesFilter<"Alert"> | number
    type?: EnumAlertTypeWithAggregatesFilter<"Alert"> | $Enums.AlertType
    noOfPeople?: IntWithAggregatesFilter<"Alert"> | number
    url?: StringNullableWithAggregatesFilter<"Alert"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
    isVisited?: BoolNullableWithAggregatesFilter<"Alert"> | boolean | null
    status?: EnumAlertStatusWithAggregatesFilter<"Alert"> | $Enums.AlertStatus
    isNotificationSent?: BoolWithAggregatesFilter<"Alert"> | boolean
    notificationSentAt?: DateTimeNullableWithAggregatesFilter<"Alert"> | Date | string | null
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCameras?: CameraCreateNestedManyWithoutUserInput
    createdCameras?: CameraCreateNestedManyWithoutCreatedByInput
    updatedCameras?: CameraCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCameras?: CameraUncheckedCreateNestedManyWithoutUserInput
    createdCameras?: CameraUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCameras?: CameraUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCameras?: CameraUpdateManyWithoutUserNestedInput
    createdCameras?: CameraUpdateManyWithoutCreatedByNestedInput
    updatedCameras?: CameraUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCameras?: CameraUncheckedUpdateManyWithoutUserNestedInput
    createdCameras?: CameraUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCameras?: CameraUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CameraCreateInput = {
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOwnedCamerasInput
    createdBy: UserCreateNestedOneWithoutCreatedCamerasInput
    updatedBy: UserCreateNestedOneWithoutUpdatedCamerasInput
    Alert?: AlertCreateNestedManyWithoutCameraInput
  }

  export type CameraUncheckedCreateInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    createdById: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Alert?: AlertUncheckedCreateNestedManyWithoutCameraInput
  }

  export type CameraUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOwnedCamerasNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCamerasNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedCamerasNestedInput
    Alert?: AlertUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Alert?: AlertUncheckedUpdateManyWithoutCameraNestedInput
  }

  export type CameraCreateManyInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    createdById: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CameraUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CameraUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateInput = {
    type: $Enums.AlertType
    noOfPeople: number
    url?: string | null
    createdAt?: Date | string
    isVisited?: boolean | null
    status?: $Enums.AlertStatus
    isNotificationSent?: boolean
    notificationSentAt?: Date | string | null
    camera: CameraCreateNestedOneWithoutAlertInput
  }

  export type AlertUncheckedCreateInput = {
    id?: number
    cameraId: number
    type: $Enums.AlertType
    noOfPeople: number
    url?: string | null
    createdAt?: Date | string
    isVisited?: boolean | null
    status?: $Enums.AlertStatus
    isNotificationSent?: boolean
    notificationSentAt?: Date | string | null
  }

  export type AlertUpdateInput = {
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    camera?: CameraUpdateOneRequiredWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cameraId?: IntFieldUpdateOperationsInput | number
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertCreateManyInput = {
    id?: number
    cameraId: number
    type: $Enums.AlertType
    noOfPeople: number
    url?: string | null
    createdAt?: Date | string
    isVisited?: boolean | null
    status?: $Enums.AlertStatus
    isNotificationSent?: boolean
    notificationSentAt?: Date | string | null
  }

  export type AlertUpdateManyMutationInput = {
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cameraId?: IntFieldUpdateOperationsInput | number
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CameraListRelationFilter = {
    every?: CameraWhereInput
    some?: CameraWhereInput
    none?: CameraWhereInput
  }

  export type CameraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumLocationFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[]
    notIn?: $Enums.Location[]
    not?: NestedEnumLocationFilter<$PrismaModel> | $Enums.Location
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumCameraTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraType | EnumCameraTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CameraType[]
    notIn?: $Enums.CameraType[]
    not?: NestedEnumCameraTypeFilter<$PrismaModel> | $Enums.CameraType
  }

  export type EnumCameraStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraStatus | EnumCameraStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CameraStatus[]
    notIn?: $Enums.CameraStatus[]
    not?: NestedEnumCameraStatusFilter<$PrismaModel> | $Enums.CameraStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AlertListRelationFilter = {
    every?: AlertWhereInput
    some?: AlertWhereInput
    none?: AlertWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CameraOrderByRelevanceInput = {
    fields: CameraOrderByRelevanceFieldEnum | CameraOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CameraCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    ipAddress?: SortOrder
    port?: SortOrder
    type?: SortOrder
    protocol?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrder
    alertThreshold?: SortOrder
    cameraUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CameraAvgOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrder
    alertThreshold?: SortOrder
  }

  export type CameraMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    ipAddress?: SortOrder
    port?: SortOrder
    type?: SortOrder
    protocol?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrder
    alertThreshold?: SortOrder
    cameraUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CameraMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    ipAddress?: SortOrder
    port?: SortOrder
    type?: SortOrder
    protocol?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrder
    alertThreshold?: SortOrder
    cameraUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CameraSumOrderByAggregateInput = {
    id?: SortOrder
    port?: SortOrder
    userId?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
    heightThreshold?: SortOrder
    alertThreshold?: SortOrder
  }

  export type EnumLocationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[]
    notIn?: $Enums.Location[]
    not?: NestedEnumLocationWithAggregatesFilter<$PrismaModel> | $Enums.Location
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationFilter<$PrismaModel>
    _max?: NestedEnumLocationFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumCameraTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraType | EnumCameraTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CameraType[]
    notIn?: $Enums.CameraType[]
    not?: NestedEnumCameraTypeWithAggregatesFilter<$PrismaModel> | $Enums.CameraType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCameraTypeFilter<$PrismaModel>
    _max?: NestedEnumCameraTypeFilter<$PrismaModel>
  }

  export type EnumCameraStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraStatus | EnumCameraStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CameraStatus[]
    notIn?: $Enums.CameraStatus[]
    not?: NestedEnumCameraStatusWithAggregatesFilter<$PrismaModel> | $Enums.CameraStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCameraStatusFilter<$PrismaModel>
    _max?: NestedEnumCameraStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumAlertTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | EnumAlertTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AlertType[]
    notIn?: $Enums.AlertType[]
    not?: NestedEnumAlertTypeFilter<$PrismaModel> | $Enums.AlertType
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnumAlertStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[]
    notIn?: $Enums.AlertStatus[]
    not?: NestedEnumAlertStatusFilter<$PrismaModel> | $Enums.AlertStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CameraScalarRelationFilter = {
    is?: CameraWhereInput
    isNot?: CameraWhereInput
  }

  export type AlertOrderByRelevanceInput = {
    fields: AlertOrderByRelevanceFieldEnum | AlertOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    cameraId?: SortOrder
    type?: SortOrder
    noOfPeople?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    isVisited?: SortOrder
    status?: SortOrder
    isNotificationSent?: SortOrder
    notificationSentAt?: SortOrder
  }

  export type AlertAvgOrderByAggregateInput = {
    id?: SortOrder
    cameraId?: SortOrder
    noOfPeople?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    cameraId?: SortOrder
    type?: SortOrder
    noOfPeople?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    isVisited?: SortOrder
    status?: SortOrder
    isNotificationSent?: SortOrder
    notificationSentAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    cameraId?: SortOrder
    type?: SortOrder
    noOfPeople?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    isVisited?: SortOrder
    status?: SortOrder
    isNotificationSent?: SortOrder
    notificationSentAt?: SortOrder
  }

  export type AlertSumOrderByAggregateInput = {
    id?: SortOrder
    cameraId?: SortOrder
    noOfPeople?: SortOrder
  }

  export type EnumAlertTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | EnumAlertTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AlertType[]
    notIn?: $Enums.AlertType[]
    not?: NestedEnumAlertTypeWithAggregatesFilter<$PrismaModel> | $Enums.AlertType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertTypeFilter<$PrismaModel>
    _max?: NestedEnumAlertTypeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumAlertStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[]
    notIn?: $Enums.AlertStatus[]
    not?: NestedEnumAlertStatusWithAggregatesFilter<$PrismaModel> | $Enums.AlertStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertStatusFilter<$PrismaModel>
    _max?: NestedEnumAlertStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CameraCreateNestedManyWithoutUserInput = {
    create?: XOR<CameraCreateWithoutUserInput, CameraUncheckedCreateWithoutUserInput> | CameraCreateWithoutUserInput[] | CameraUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUserInput | CameraCreateOrConnectWithoutUserInput[]
    createMany?: CameraCreateManyUserInputEnvelope
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
  }

  export type CameraCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CameraCreateWithoutCreatedByInput, CameraUncheckedCreateWithoutCreatedByInput> | CameraCreateWithoutCreatedByInput[] | CameraUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutCreatedByInput | CameraCreateOrConnectWithoutCreatedByInput[]
    createMany?: CameraCreateManyCreatedByInputEnvelope
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
  }

  export type CameraCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<CameraCreateWithoutUpdatedByInput, CameraUncheckedCreateWithoutUpdatedByInput> | CameraCreateWithoutUpdatedByInput[] | CameraUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUpdatedByInput | CameraCreateOrConnectWithoutUpdatedByInput[]
    createMany?: CameraCreateManyUpdatedByInputEnvelope
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
  }

  export type CameraUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CameraCreateWithoutUserInput, CameraUncheckedCreateWithoutUserInput> | CameraCreateWithoutUserInput[] | CameraUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUserInput | CameraCreateOrConnectWithoutUserInput[]
    createMany?: CameraCreateManyUserInputEnvelope
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
  }

  export type CameraUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CameraCreateWithoutCreatedByInput, CameraUncheckedCreateWithoutCreatedByInput> | CameraCreateWithoutCreatedByInput[] | CameraUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutCreatedByInput | CameraCreateOrConnectWithoutCreatedByInput[]
    createMany?: CameraCreateManyCreatedByInputEnvelope
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
  }

  export type CameraUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<CameraCreateWithoutUpdatedByInput, CameraUncheckedCreateWithoutUpdatedByInput> | CameraCreateWithoutUpdatedByInput[] | CameraUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUpdatedByInput | CameraCreateOrConnectWithoutUpdatedByInput[]
    createMany?: CameraCreateManyUpdatedByInputEnvelope
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CameraUpdateManyWithoutUserNestedInput = {
    create?: XOR<CameraCreateWithoutUserInput, CameraUncheckedCreateWithoutUserInput> | CameraCreateWithoutUserInput[] | CameraUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUserInput | CameraCreateOrConnectWithoutUserInput[]
    upsert?: CameraUpsertWithWhereUniqueWithoutUserInput | CameraUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CameraCreateManyUserInputEnvelope
    set?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    disconnect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    delete?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    update?: CameraUpdateWithWhereUniqueWithoutUserInput | CameraUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CameraUpdateManyWithWhereWithoutUserInput | CameraUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CameraScalarWhereInput | CameraScalarWhereInput[]
  }

  export type CameraUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CameraCreateWithoutCreatedByInput, CameraUncheckedCreateWithoutCreatedByInput> | CameraCreateWithoutCreatedByInput[] | CameraUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutCreatedByInput | CameraCreateOrConnectWithoutCreatedByInput[]
    upsert?: CameraUpsertWithWhereUniqueWithoutCreatedByInput | CameraUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CameraCreateManyCreatedByInputEnvelope
    set?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    disconnect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    delete?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    update?: CameraUpdateWithWhereUniqueWithoutCreatedByInput | CameraUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CameraUpdateManyWithWhereWithoutCreatedByInput | CameraUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CameraScalarWhereInput | CameraScalarWhereInput[]
  }

  export type CameraUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<CameraCreateWithoutUpdatedByInput, CameraUncheckedCreateWithoutUpdatedByInput> | CameraCreateWithoutUpdatedByInput[] | CameraUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUpdatedByInput | CameraCreateOrConnectWithoutUpdatedByInput[]
    upsert?: CameraUpsertWithWhereUniqueWithoutUpdatedByInput | CameraUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: CameraCreateManyUpdatedByInputEnvelope
    set?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    disconnect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    delete?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    update?: CameraUpdateWithWhereUniqueWithoutUpdatedByInput | CameraUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: CameraUpdateManyWithWhereWithoutUpdatedByInput | CameraUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: CameraScalarWhereInput | CameraScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CameraUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CameraCreateWithoutUserInput, CameraUncheckedCreateWithoutUserInput> | CameraCreateWithoutUserInput[] | CameraUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUserInput | CameraCreateOrConnectWithoutUserInput[]
    upsert?: CameraUpsertWithWhereUniqueWithoutUserInput | CameraUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CameraCreateManyUserInputEnvelope
    set?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    disconnect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    delete?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    update?: CameraUpdateWithWhereUniqueWithoutUserInput | CameraUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CameraUpdateManyWithWhereWithoutUserInput | CameraUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CameraScalarWhereInput | CameraScalarWhereInput[]
  }

  export type CameraUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CameraCreateWithoutCreatedByInput, CameraUncheckedCreateWithoutCreatedByInput> | CameraCreateWithoutCreatedByInput[] | CameraUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutCreatedByInput | CameraCreateOrConnectWithoutCreatedByInput[]
    upsert?: CameraUpsertWithWhereUniqueWithoutCreatedByInput | CameraUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CameraCreateManyCreatedByInputEnvelope
    set?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    disconnect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    delete?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    update?: CameraUpdateWithWhereUniqueWithoutCreatedByInput | CameraUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CameraUpdateManyWithWhereWithoutCreatedByInput | CameraUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CameraScalarWhereInput | CameraScalarWhereInput[]
  }

  export type CameraUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<CameraCreateWithoutUpdatedByInput, CameraUncheckedCreateWithoutUpdatedByInput> | CameraCreateWithoutUpdatedByInput[] | CameraUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CameraCreateOrConnectWithoutUpdatedByInput | CameraCreateOrConnectWithoutUpdatedByInput[]
    upsert?: CameraUpsertWithWhereUniqueWithoutUpdatedByInput | CameraUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: CameraCreateManyUpdatedByInputEnvelope
    set?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    disconnect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    delete?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    connect?: CameraWhereUniqueInput | CameraWhereUniqueInput[]
    update?: CameraUpdateWithWhereUniqueWithoutUpdatedByInput | CameraUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: CameraUpdateManyWithWhereWithoutUpdatedByInput | CameraUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: CameraScalarWhereInput | CameraScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOwnedCamerasInput = {
    create?: XOR<UserCreateWithoutOwnedCamerasInput, UserUncheckedCreateWithoutOwnedCamerasInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCamerasInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedCamerasInput = {
    create?: XOR<UserCreateWithoutCreatedCamerasInput, UserUncheckedCreateWithoutCreatedCamerasInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCamerasInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUpdatedCamerasInput = {
    create?: XOR<UserCreateWithoutUpdatedCamerasInput, UserUncheckedCreateWithoutUpdatedCamerasInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedCamerasInput
    connect?: UserWhereUniqueInput
  }

  export type AlertCreateNestedManyWithoutCameraInput = {
    create?: XOR<AlertCreateWithoutCameraInput, AlertUncheckedCreateWithoutCameraInput> | AlertCreateWithoutCameraInput[] | AlertUncheckedCreateWithoutCameraInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCameraInput | AlertCreateOrConnectWithoutCameraInput[]
    createMany?: AlertCreateManyCameraInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutCameraInput = {
    create?: XOR<AlertCreateWithoutCameraInput, AlertUncheckedCreateWithoutCameraInput> | AlertCreateWithoutCameraInput[] | AlertUncheckedCreateWithoutCameraInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCameraInput | AlertCreateOrConnectWithoutCameraInput[]
    createMany?: AlertCreateManyCameraInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type EnumLocationFieldUpdateOperationsInput = {
    set?: $Enums.Location
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCameraTypeFieldUpdateOperationsInput = {
    set?: $Enums.CameraType
  }

  export type EnumCameraStatusFieldUpdateOperationsInput = {
    set?: $Enums.CameraStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutOwnedCamerasNestedInput = {
    create?: XOR<UserCreateWithoutOwnedCamerasInput, UserUncheckedCreateWithoutOwnedCamerasInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedCamerasInput
    upsert?: UserUpsertWithoutOwnedCamerasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedCamerasInput, UserUpdateWithoutOwnedCamerasInput>, UserUncheckedUpdateWithoutOwnedCamerasInput>
  }

  export type UserUpdateOneRequiredWithoutCreatedCamerasNestedInput = {
    create?: XOR<UserCreateWithoutCreatedCamerasInput, UserUncheckedCreateWithoutCreatedCamerasInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCamerasInput
    upsert?: UserUpsertWithoutCreatedCamerasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCamerasInput, UserUpdateWithoutCreatedCamerasInput>, UserUncheckedUpdateWithoutCreatedCamerasInput>
  }

  export type UserUpdateOneRequiredWithoutUpdatedCamerasNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedCamerasInput, UserUncheckedCreateWithoutUpdatedCamerasInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedCamerasInput
    upsert?: UserUpsertWithoutUpdatedCamerasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUpdatedCamerasInput, UserUpdateWithoutUpdatedCamerasInput>, UserUncheckedUpdateWithoutUpdatedCamerasInput>
  }

  export type AlertUpdateManyWithoutCameraNestedInput = {
    create?: XOR<AlertCreateWithoutCameraInput, AlertUncheckedCreateWithoutCameraInput> | AlertCreateWithoutCameraInput[] | AlertUncheckedCreateWithoutCameraInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCameraInput | AlertCreateOrConnectWithoutCameraInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutCameraInput | AlertUpsertWithWhereUniqueWithoutCameraInput[]
    createMany?: AlertCreateManyCameraInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutCameraInput | AlertUpdateWithWhereUniqueWithoutCameraInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutCameraInput | AlertUpdateManyWithWhereWithoutCameraInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutCameraNestedInput = {
    create?: XOR<AlertCreateWithoutCameraInput, AlertUncheckedCreateWithoutCameraInput> | AlertCreateWithoutCameraInput[] | AlertUncheckedCreateWithoutCameraInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCameraInput | AlertCreateOrConnectWithoutCameraInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutCameraInput | AlertUpsertWithWhereUniqueWithoutCameraInput[]
    createMany?: AlertCreateManyCameraInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutCameraInput | AlertUpdateWithWhereUniqueWithoutCameraInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutCameraInput | AlertUpdateManyWithWhereWithoutCameraInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type CameraCreateNestedOneWithoutAlertInput = {
    create?: XOR<CameraCreateWithoutAlertInput, CameraUncheckedCreateWithoutAlertInput>
    connectOrCreate?: CameraCreateOrConnectWithoutAlertInput
    connect?: CameraWhereUniqueInput
  }

  export type EnumAlertTypeFieldUpdateOperationsInput = {
    set?: $Enums.AlertType
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type EnumAlertStatusFieldUpdateOperationsInput = {
    set?: $Enums.AlertStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CameraUpdateOneRequiredWithoutAlertNestedInput = {
    create?: XOR<CameraCreateWithoutAlertInput, CameraUncheckedCreateWithoutAlertInput>
    connectOrCreate?: CameraCreateOrConnectWithoutAlertInput
    upsert?: CameraUpsertWithoutAlertInput
    connect?: CameraWhereUniqueInput
    update?: XOR<XOR<CameraUpdateToOneWithWhereWithoutAlertInput, CameraUpdateWithoutAlertInput>, CameraUncheckedUpdateWithoutAlertInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumLocationFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[]
    notIn?: $Enums.Location[]
    not?: NestedEnumLocationFilter<$PrismaModel> | $Enums.Location
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCameraTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraType | EnumCameraTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CameraType[]
    notIn?: $Enums.CameraType[]
    not?: NestedEnumCameraTypeFilter<$PrismaModel> | $Enums.CameraType
  }

  export type NestedEnumCameraStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraStatus | EnumCameraStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CameraStatus[]
    notIn?: $Enums.CameraStatus[]
    not?: NestedEnumCameraStatusFilter<$PrismaModel> | $Enums.CameraStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLocationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Location | EnumLocationFieldRefInput<$PrismaModel>
    in?: $Enums.Location[]
    notIn?: $Enums.Location[]
    not?: NestedEnumLocationWithAggregatesFilter<$PrismaModel> | $Enums.Location
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocationFilter<$PrismaModel>
    _max?: NestedEnumLocationFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumCameraTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraType | EnumCameraTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CameraType[]
    notIn?: $Enums.CameraType[]
    not?: NestedEnumCameraTypeWithAggregatesFilter<$PrismaModel> | $Enums.CameraType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCameraTypeFilter<$PrismaModel>
    _max?: NestedEnumCameraTypeFilter<$PrismaModel>
  }

  export type NestedEnumCameraStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CameraStatus | EnumCameraStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CameraStatus[]
    notIn?: $Enums.CameraStatus[]
    not?: NestedEnumCameraStatusWithAggregatesFilter<$PrismaModel> | $Enums.CameraStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCameraStatusFilter<$PrismaModel>
    _max?: NestedEnumCameraStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumAlertTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | EnumAlertTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AlertType[]
    notIn?: $Enums.AlertType[]
    not?: NestedEnumAlertTypeFilter<$PrismaModel> | $Enums.AlertType
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumAlertStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[]
    notIn?: $Enums.AlertStatus[]
    not?: NestedEnumAlertStatusFilter<$PrismaModel> | $Enums.AlertStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumAlertTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertType | EnumAlertTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AlertType[]
    notIn?: $Enums.AlertType[]
    not?: NestedEnumAlertTypeWithAggregatesFilter<$PrismaModel> | $Enums.AlertType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertTypeFilter<$PrismaModel>
    _max?: NestedEnumAlertTypeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumAlertStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertStatus | EnumAlertStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AlertStatus[]
    notIn?: $Enums.AlertStatus[]
    not?: NestedEnumAlertStatusWithAggregatesFilter<$PrismaModel> | $Enums.AlertStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertStatusFilter<$PrismaModel>
    _max?: NestedEnumAlertStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CameraCreateWithoutUserInput = {
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedCamerasInput
    updatedBy: UserCreateNestedOneWithoutUpdatedCamerasInput
    Alert?: AlertCreateNestedManyWithoutCameraInput
  }

  export type CameraUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    createdById: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Alert?: AlertUncheckedCreateNestedManyWithoutCameraInput
  }

  export type CameraCreateOrConnectWithoutUserInput = {
    where: CameraWhereUniqueInput
    create: XOR<CameraCreateWithoutUserInput, CameraUncheckedCreateWithoutUserInput>
  }

  export type CameraCreateManyUserInputEnvelope = {
    data: CameraCreateManyUserInput | CameraCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CameraCreateWithoutCreatedByInput = {
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOwnedCamerasInput
    updatedBy: UserCreateNestedOneWithoutUpdatedCamerasInput
    Alert?: AlertCreateNestedManyWithoutCameraInput
  }

  export type CameraUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Alert?: AlertUncheckedCreateNestedManyWithoutCameraInput
  }

  export type CameraCreateOrConnectWithoutCreatedByInput = {
    where: CameraWhereUniqueInput
    create: XOR<CameraCreateWithoutCreatedByInput, CameraUncheckedCreateWithoutCreatedByInput>
  }

  export type CameraCreateManyCreatedByInputEnvelope = {
    data: CameraCreateManyCreatedByInput | CameraCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type CameraCreateWithoutUpdatedByInput = {
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOwnedCamerasInput
    createdBy: UserCreateNestedOneWithoutCreatedCamerasInput
    Alert?: AlertCreateNestedManyWithoutCameraInput
  }

  export type CameraUncheckedCreateWithoutUpdatedByInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    createdById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Alert?: AlertUncheckedCreateNestedManyWithoutCameraInput
  }

  export type CameraCreateOrConnectWithoutUpdatedByInput = {
    where: CameraWhereUniqueInput
    create: XOR<CameraCreateWithoutUpdatedByInput, CameraUncheckedCreateWithoutUpdatedByInput>
  }

  export type CameraCreateManyUpdatedByInputEnvelope = {
    data: CameraCreateManyUpdatedByInput | CameraCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type CameraUpsertWithWhereUniqueWithoutUserInput = {
    where: CameraWhereUniqueInput
    update: XOR<CameraUpdateWithoutUserInput, CameraUncheckedUpdateWithoutUserInput>
    create: XOR<CameraCreateWithoutUserInput, CameraUncheckedCreateWithoutUserInput>
  }

  export type CameraUpdateWithWhereUniqueWithoutUserInput = {
    where: CameraWhereUniqueInput
    data: XOR<CameraUpdateWithoutUserInput, CameraUncheckedUpdateWithoutUserInput>
  }

  export type CameraUpdateManyWithWhereWithoutUserInput = {
    where: CameraScalarWhereInput
    data: XOR<CameraUpdateManyMutationInput, CameraUncheckedUpdateManyWithoutUserInput>
  }

  export type CameraScalarWhereInput = {
    AND?: CameraScalarWhereInput | CameraScalarWhereInput[]
    OR?: CameraScalarWhereInput[]
    NOT?: CameraScalarWhereInput | CameraScalarWhereInput[]
    id?: IntFilter<"Camera"> | number
    name?: StringFilter<"Camera"> | string
    location?: EnumLocationFilter<"Camera"> | $Enums.Location
    ipAddress?: StringNullableFilter<"Camera"> | string | null
    port?: IntNullableFilter<"Camera"> | number | null
    type?: EnumCameraTypeFilter<"Camera"> | $Enums.CameraType
    protocol?: StringNullableFilter<"Camera"> | string | null
    status?: EnumCameraStatusFilter<"Camera"> | $Enums.CameraStatus
    userId?: IntFilter<"Camera"> | number
    createdById?: IntFilter<"Camera"> | number
    updatedById?: IntFilter<"Camera"> | number
    heightThreshold?: FloatNullableFilter<"Camera"> | number | null
    alertThreshold?: FloatFilter<"Camera"> | number
    cameraUrl?: StringNullableFilter<"Camera"> | string | null
    createdAt?: DateTimeFilter<"Camera"> | Date | string
    updatedAt?: DateTimeFilter<"Camera"> | Date | string
  }

  export type CameraUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CameraWhereUniqueInput
    update: XOR<CameraUpdateWithoutCreatedByInput, CameraUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CameraCreateWithoutCreatedByInput, CameraUncheckedCreateWithoutCreatedByInput>
  }

  export type CameraUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CameraWhereUniqueInput
    data: XOR<CameraUpdateWithoutCreatedByInput, CameraUncheckedUpdateWithoutCreatedByInput>
  }

  export type CameraUpdateManyWithWhereWithoutCreatedByInput = {
    where: CameraScalarWhereInput
    data: XOR<CameraUpdateManyMutationInput, CameraUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CameraUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: CameraWhereUniqueInput
    update: XOR<CameraUpdateWithoutUpdatedByInput, CameraUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<CameraCreateWithoutUpdatedByInput, CameraUncheckedCreateWithoutUpdatedByInput>
  }

  export type CameraUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: CameraWhereUniqueInput
    data: XOR<CameraUpdateWithoutUpdatedByInput, CameraUncheckedUpdateWithoutUpdatedByInput>
  }

  export type CameraUpdateManyWithWhereWithoutUpdatedByInput = {
    where: CameraScalarWhereInput
    data: XOR<CameraUpdateManyMutationInput, CameraUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type UserCreateWithoutOwnedCamerasInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    createdCameras?: CameraCreateNestedManyWithoutCreatedByInput
    updatedCameras?: CameraCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutOwnedCamerasInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    createdCameras?: CameraUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCameras?: CameraUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutOwnedCamerasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedCamerasInput, UserUncheckedCreateWithoutOwnedCamerasInput>
  }

  export type UserCreateWithoutCreatedCamerasInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCameras?: CameraCreateNestedManyWithoutUserInput
    updatedCameras?: CameraCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedCamerasInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCameras?: CameraUncheckedCreateNestedManyWithoutUserInput
    updatedCameras?: CameraUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedCamerasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedCamerasInput, UserUncheckedCreateWithoutCreatedCamerasInput>
  }

  export type UserCreateWithoutUpdatedCamerasInput = {
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCameras?: CameraCreateNestedManyWithoutUserInput
    createdCameras?: CameraCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutUpdatedCamerasInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedCameras?: CameraUncheckedCreateNestedManyWithoutUserInput
    createdCameras?: CameraUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutUpdatedCamerasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpdatedCamerasInput, UserUncheckedCreateWithoutUpdatedCamerasInput>
  }

  export type AlertCreateWithoutCameraInput = {
    type: $Enums.AlertType
    noOfPeople: number
    url?: string | null
    createdAt?: Date | string
    isVisited?: boolean | null
    status?: $Enums.AlertStatus
    isNotificationSent?: boolean
    notificationSentAt?: Date | string | null
  }

  export type AlertUncheckedCreateWithoutCameraInput = {
    id?: number
    type: $Enums.AlertType
    noOfPeople: number
    url?: string | null
    createdAt?: Date | string
    isVisited?: boolean | null
    status?: $Enums.AlertStatus
    isNotificationSent?: boolean
    notificationSentAt?: Date | string | null
  }

  export type AlertCreateOrConnectWithoutCameraInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutCameraInput, AlertUncheckedCreateWithoutCameraInput>
  }

  export type AlertCreateManyCameraInputEnvelope = {
    data: AlertCreateManyCameraInput | AlertCreateManyCameraInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedCamerasInput = {
    update: XOR<UserUpdateWithoutOwnedCamerasInput, UserUncheckedUpdateWithoutOwnedCamerasInput>
    create: XOR<UserCreateWithoutOwnedCamerasInput, UserUncheckedCreateWithoutOwnedCamerasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedCamerasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedCamerasInput, UserUncheckedUpdateWithoutOwnedCamerasInput>
  }

  export type UserUpdateWithoutOwnedCamerasInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdCameras?: CameraUpdateManyWithoutCreatedByNestedInput
    updatedCameras?: CameraUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedCamerasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdCameras?: CameraUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCameras?: CameraUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutCreatedCamerasInput = {
    update: XOR<UserUpdateWithoutCreatedCamerasInput, UserUncheckedUpdateWithoutCreatedCamerasInput>
    create: XOR<UserCreateWithoutCreatedCamerasInput, UserUncheckedCreateWithoutCreatedCamerasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedCamerasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedCamerasInput, UserUncheckedUpdateWithoutCreatedCamerasInput>
  }

  export type UserUpdateWithoutCreatedCamerasInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCameras?: CameraUpdateManyWithoutUserNestedInput
    updatedCameras?: CameraUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedCamerasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCameras?: CameraUncheckedUpdateManyWithoutUserNestedInput
    updatedCameras?: CameraUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutUpdatedCamerasInput = {
    update: XOR<UserUpdateWithoutUpdatedCamerasInput, UserUncheckedUpdateWithoutUpdatedCamerasInput>
    create: XOR<UserCreateWithoutUpdatedCamerasInput, UserUncheckedCreateWithoutUpdatedCamerasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUpdatedCamerasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUpdatedCamerasInput, UserUncheckedUpdateWithoutUpdatedCamerasInput>
  }

  export type UserUpdateWithoutUpdatedCamerasInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCameras?: CameraUpdateManyWithoutUserNestedInput
    createdCameras?: CameraUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUpdatedCamerasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedCameras?: CameraUncheckedUpdateManyWithoutUserNestedInput
    createdCameras?: CameraUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type AlertUpsertWithWhereUniqueWithoutCameraInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutCameraInput, AlertUncheckedUpdateWithoutCameraInput>
    create: XOR<AlertCreateWithoutCameraInput, AlertUncheckedCreateWithoutCameraInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutCameraInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutCameraInput, AlertUncheckedUpdateWithoutCameraInput>
  }

  export type AlertUpdateManyWithWhereWithoutCameraInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutCameraInput>
  }

  export type AlertScalarWhereInput = {
    AND?: AlertScalarWhereInput | AlertScalarWhereInput[]
    OR?: AlertScalarWhereInput[]
    NOT?: AlertScalarWhereInput | AlertScalarWhereInput[]
    id?: IntFilter<"Alert"> | number
    cameraId?: IntFilter<"Alert"> | number
    type?: EnumAlertTypeFilter<"Alert"> | $Enums.AlertType
    noOfPeople?: IntFilter<"Alert"> | number
    url?: StringNullableFilter<"Alert"> | string | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    isVisited?: BoolNullableFilter<"Alert"> | boolean | null
    status?: EnumAlertStatusFilter<"Alert"> | $Enums.AlertStatus
    isNotificationSent?: BoolFilter<"Alert"> | boolean
    notificationSentAt?: DateTimeNullableFilter<"Alert"> | Date | string | null
  }

  export type CameraCreateWithoutAlertInput = {
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOwnedCamerasInput
    createdBy: UserCreateNestedOneWithoutCreatedCamerasInput
    updatedBy: UserCreateNestedOneWithoutUpdatedCamerasInput
  }

  export type CameraUncheckedCreateWithoutAlertInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    createdById: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CameraCreateOrConnectWithoutAlertInput = {
    where: CameraWhereUniqueInput
    create: XOR<CameraCreateWithoutAlertInput, CameraUncheckedCreateWithoutAlertInput>
  }

  export type CameraUpsertWithoutAlertInput = {
    update: XOR<CameraUpdateWithoutAlertInput, CameraUncheckedUpdateWithoutAlertInput>
    create: XOR<CameraCreateWithoutAlertInput, CameraUncheckedCreateWithoutAlertInput>
    where?: CameraWhereInput
  }

  export type CameraUpdateToOneWithWhereWithoutAlertInput = {
    where?: CameraWhereInput
    data: XOR<CameraUpdateWithoutAlertInput, CameraUncheckedUpdateWithoutAlertInput>
  }

  export type CameraUpdateWithoutAlertInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOwnedCamerasNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCamerasNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedCamerasNestedInput
  }

  export type CameraUncheckedUpdateWithoutAlertInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CameraCreateManyUserInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    createdById: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CameraCreateManyCreatedByInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    updatedById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CameraCreateManyUpdatedByInput = {
    id?: number
    name: string
    location: $Enums.Location
    ipAddress?: string | null
    port?: number | null
    type: $Enums.CameraType
    protocol?: string | null
    status: $Enums.CameraStatus
    userId: number
    createdById: number
    heightThreshold?: number | null
    alertThreshold?: number
    cameraUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CameraUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedCamerasNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedCamerasNestedInput
    Alert?: AlertUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    createdById?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Alert?: AlertUncheckedUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    createdById?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CameraUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOwnedCamerasNestedInput
    updatedBy?: UserUpdateOneRequiredWithoutUpdatedCamerasNestedInput
    Alert?: AlertUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Alert?: AlertUncheckedUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    updatedById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CameraUpdateWithoutUpdatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOwnedCamerasNestedInput
    createdBy?: UserUpdateOneRequiredWithoutCreatedCamerasNestedInput
    Alert?: AlertUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateWithoutUpdatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Alert?: AlertUncheckedUpdateManyWithoutCameraNestedInput
  }

  export type CameraUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: EnumLocationFieldUpdateOperationsInput | $Enums.Location
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    port?: NullableIntFieldUpdateOperationsInput | number | null
    type?: EnumCameraTypeFieldUpdateOperationsInput | $Enums.CameraType
    protocol?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCameraStatusFieldUpdateOperationsInput | $Enums.CameraStatus
    userId?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    heightThreshold?: NullableFloatFieldUpdateOperationsInput | number | null
    alertThreshold?: FloatFieldUpdateOperationsInput | number
    cameraUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateManyCameraInput = {
    id?: number
    type: $Enums.AlertType
    noOfPeople: number
    url?: string | null
    createdAt?: Date | string
    isVisited?: boolean | null
    status?: $Enums.AlertStatus
    isNotificationSent?: boolean
    notificationSentAt?: Date | string | null
  }

  export type AlertUpdateWithoutCameraInput = {
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateWithoutCameraInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AlertUncheckedUpdateManyWithoutCameraInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumAlertTypeFieldUpdateOperationsInput | $Enums.AlertType
    noOfPeople?: IntFieldUpdateOperationsInput | number
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVisited?: NullableBoolFieldUpdateOperationsInput | boolean | null
    status?: EnumAlertStatusFieldUpdateOperationsInput | $Enums.AlertStatus
    isNotificationSent?: BoolFieldUpdateOperationsInput | boolean
    notificationSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}