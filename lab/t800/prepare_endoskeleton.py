import bpy
import os
import re
import sys


BLEND_PATH = bpy.data.filepath
INSPECT_ONLY = "--inspect-only" in sys.argv
HUMAN_TOKENS = (
    "human",
    "uma",
    "arnold",
)
ENDO_TOKENS = (
    "endo",
    "endoskeleton",
)
RIG_TOKENS = ("rig", "armature", "skeleton")


def normalized(value):
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def ancestry_names(obj):
    parent_by_collection = {}
    for parent in bpy.data.collections:
        for child in parent.children:
            parent_by_collection[child] = parent
    names = []
    for collection in obj.users_collection:
        current = collection
        while current is not None:
            names.append(normalized(current.name))
            current = parent_by_collection.get(current)
    return names


def object_text(obj):
    values = [obj.name, getattr(obj.data, "name", "")]
    values.extend(ancestry_names(obj))
    return " ".join(normalized(value) for value in values if value)


def is_human_candidate(obj):
    collection_names = ancestry_names(obj)
    if any(name == "human" or name in HUMAN_TOKENS for name in collection_names):
        return True
    text = object_text(obj)
    return any(token in text for token in ("arnold", "uma"))


def is_endo_candidate(obj):
    text = object_text(obj)
    return any(token in text for token in ENDO_TOKENS) and not is_human_candidate(obj)


def print_group(title, objects):
    print("\n=== {} ({}) ===".format(title, len(objects)))
    for obj in sorted(objects, key=lambda item: item.name.lower()):
        collections = ", ".join(collection.name for collection in obj.users_collection)
        print("{} | type={} | data={} | collections={}".format(
            obj.name,
            obj.type,
            getattr(obj.data, "name", "<none>"),
            collections or "<none>",
        ))


all_objects = list(bpy.data.objects)
human_candidates = [obj for obj in all_objects if is_human_candidate(obj)]
endo_objects = [obj for obj in all_objects if is_endo_candidate(obj)]
preserved_armatures = [obj for obj in all_objects if obj.type == "ARMATURE" and obj not in human_candidates]

print("SOURCE BLEND: {}".format(BLEND_PATH))
print_group("OBJECTS CANDIDATE FOR REMOVAL", human_candidates)
print_group("ENDO OBJECTS TO PRESERVE", endo_objects)
print_group("ARMATURES TO PRESERVE", preserved_armatures)

preserved_other_meshes = [obj for obj in all_objects if obj.type == "MESH" and obj not in human_candidates and obj not in endo_objects]
print_group("OTHER MESHES PRESERVED", preserved_other_meshes)

if not BLEND_PATH:
    raise RuntimeError("The current file has not been saved; refusing to continue.")
if INSPECT_ONLY:
    print("INSPECTION ONLY: no data was changed.")
    raise SystemExit(0)

for obj in human_candidates:
    bpy.data.objects.remove(obj, do_unlink=True)

for obj in bpy.data.objects:
    belongs_to_endo = any(collection.name == "Endo" for collection in obj.users_collection)
    if belongs_to_endo or obj.type == "ARMATURE":
        if belongs_to_endo:
            obj.driver_remove("hide_viewport")
            obj.driver_remove("hide_render")
        obj.hide_viewport = False
        obj.hide_render = False
        obj.hide_set(False)

for collection in bpy.data.collections:
    if normalized(collection.name) == "endo":
        collection.hide_viewport = False
        collection.hide_render = False

# Remove only datablocks that have no users after unlinking human objects.
for collection in (bpy.data.meshes, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
    for datablock in list(collection):
        if datablock.users == 0:
            collection.remove(datablock)

bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH)
print("SAVED: {}".format(os.path.abspath(BLEND_PATH)))