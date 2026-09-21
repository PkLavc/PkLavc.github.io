import bpy
import os

SOURCE = bpy.data.filepath
OUTPUT = os.path.join(os.path.dirname(SOURCE), "T-800.glb")

# Keep only the Endo meshes and the armature; bone-shape helpers and scene guides are editor-only.
keep_meshes = {"T800Endo-Arms", "T800Endo-Body", "T800Endo-Head", "T800Endo-Legs"}
for obj in list(bpy.context.scene.objects):
    if obj.type == "MESH" and obj.name not in keep_meshes:
        obj.hide_render = True
        obj.hide_viewport = True
        obj.select_set(False)
    elif obj.type == "MESH" and obj.name in keep_meshes:
        obj.select_set(True)
    elif obj.type == "ARMATURE":
        obj.hide_render = False
        obj.hide_viewport = False
        obj.select_set(True)
    elif obj.type != "MESH":
        obj.select_set(False)

bpy.context.view_layer.objects.active = next(
    (obj for obj in bpy.context.scene.objects if obj.type == "ARMATURE"), None
)

bpy.ops.export_scene.gltf(
    filepath=OUTPUT,
    export_format="GLB",
    use_selection=True,
    export_apply=False,
    export_animations=True,
    export_skins=True,
    export_morph=True,
    export_materials="EXPORT",
    export_image_format="AUTO",
    export_texture_dir="",
    export_cameras=False,
    export_lights=False,
)
print("EXPORTED:", os.path.abspath(OUTPUT))
