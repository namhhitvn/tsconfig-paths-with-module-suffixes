import { createMatchPathAsync } from "../match-path-async";
import * as Tests from "./data/match-path-data";

describe("match-path-async", () => {
  Tests.tests.forEach((t) =>
    it(t.name, (done) => {
      const matchPath = createMatchPathAsync(
        t.absoluteBaseUrl,
        t.paths,
        t.moduleSuffixes,
        t.mainFields,
        t.addMatchAll
      );
      matchPath(
        t.requestedModule,
        t.requestedModuleParent,
        (_path, callback) => callback(undefined, t.packageJson),
        (path, callback) =>
          callback(undefined, t.existingFiles.indexOf(path) !== -1),
        t.extensions,
        (_err, result) => {
          expect(result).toBe(t.expectedPath);
          done();
        }
      );
    })
  );
});
